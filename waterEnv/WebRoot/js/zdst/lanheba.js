Ext.define('bitc.wrenv.zdst.lanheba', {
    extend: 'Ext.panel.Panel',
    requires: ['Ext.ux.InklingSearchField', 'bitc.report.widget.ChooseField'],
    layout: 'border',
    lhbId: null,
    stId: null,
    initComponent: function () {
        var gridview = this.gridview = Ext.create('bitc.report.ReportView', {
            reportToken: 'lanhebaGrid',
            region: 'center',
            defaultGridWidth : false,
            columnConfig : {
                '坝长' : {
                    renderer : function(value,meta,record){
                        meta.align = "right";
                        return value;
                    }
                },
                '坝高' : {
                    renderer : function(value,meta,record){
                        meta.align = "right";
                        return value;
                    }
                },
                '蓄水量' : {
                    renderer : function(value,meta,record){
                        meta.align = "right";
                        return value;
                    }
                }
            },
            listeners: {
                gridready: this.initGrid,
                scope: this
            }
        });
        //基本信息表单
        var form = this.form = Ext.create('bitc.report.FormView', {
            formToken: 'lanhebaForm',
            title: '基本信息',
            listeners: {
                'savesuccess': function () {
                    this.gridview.reload();
                    this.reSetForm();
                },
                'formready': this.initForm,
                scope: this
            },
        });
        var superMap = this.superMap = Ext.create('bitc.report.withSuperMap');
        var stList = {
            '河流':'bitc.wrenv.zdst.heliu',
            '湖泊':'bitc.wrenv.zdst.hupo',
            '水库':'bitc.wrenv.zdst.shuiku'
        };
        //服务水体表
        var stGrid = this.stGrid = Ext.create('bitc.report.ReportView', {
            reportToken: 'fuwushuitiGrid',
            title: '相关水体',
            defaultGridWidth : false,
            gridConfig: {
                groupField:'水体类型_ID',
                features: [{
                    ftype: 'grouping',
                    groupHeaderTpl: ['{rows:this.getName}', {
                        getName: function (rows) {
                            return rows[0].get('水体类型名称');
                        }
                    }],
                    hideGroupedHeader: true,
                    startCollapsed: false
                }],
                selModel: {
                    selType: 'checkboxmodel',
                    mode: 'SIMPLE'
                },
            },
            rowContextMenu: [{
                text: '详细',
                iconCls: '',
                handler: function (widget,record, event) {
                    var type = record.get('水体类型名称');
                    var data={
                        id: type+record.get('水体_ID'),
                        text: type+'详细信息',
                        action: stList[type],
                        leaf: true,
                        iconCls: '',
                        config : {
                            stId: record.get('水体_ID')
                        }
                    };
                    debugger;
                    addWorkTab(data);
                },
                scope: this
            }],
            listeners: {
                gridready: this.initStGrid,
                scope: this
            }
        });
        this.items = [gridview, {
             xtype: 'panel',             title:'相关信息',
            autoScroll: true,
            layout:'accordion',
            collapsible: true,
            //collapseMode: 'mini',
            width: 400,
            frame: true,
            region: 'east',
            items: [form,stGrid,superMap]
        }];

        this.callParent(arguments);
    },
    initGrid: function (panel, grid) {
        grid.down('toolbar').insert(0, Ext.create('Ext.ux.InklingSearchField', {
                width: 180,
                emptyText: '请输入关键字查询',
                reportView: this.gridview,
                tooltip: {
                    title: '条件查询',
                    text: '可通过拦河坝名称查询'
                },
                inklings: [{
                    name: '拦河坝名称',
                    op: 'like',
                }]
            })
        );
        grid.on('itemdblclick', function (g, record) {
            this.reSetForm(record);
            var lhbId = this.lhbId = record.get('水利工程项目_ID');
            Ext.Ajax.request({
                url: __path + "/zdst/getStWithllb.do",
                params: {
                    dbName: '_self',
                    lhbId: lhbId
                },
                method: 'post',
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    var records = result.rows;
                    this.selectStRecords(records);
                },
                scope: this
            });
            this.superMap.reLocation(record.get('水利工程项目_ID'),record.get('拦河坝名称'),record.get(''),record.get('经纬度坐标'));
        }, this);
    },
    initStGrid: function (panel, grid) {
        grid.down('toolbar').insert(0, {
            text: '保存',
            scope: this,
            handler: function () {
                var records = grid.getSelectionModel().getSelection();
                /* if (records.length == 0) {
                 Ext.MessageBox.alert("提示", "请先选中您要操作的行!");
                 return;
                 } else*/ if (this.lhbId == null) {
                    Ext.MessageBox.alert("提示", "请先选择相关联的拦河坝工程!");
                    return;
                } else {
                    var stIds = "";
                    for (var i = 0; i < records.length; i++) {
                        stIds += records[i].get("水体_ID")
                        if (i < records.length - 1) {
                            stIds = stIds + ",";
                        }
                    }
                    Ext.Ajax.request({
                        url: __path + "/zdst/saveStWithlhb.do",
                        params: {
                            lhbId: this.lhbId,
                            stIds: stIds,
                            dbName: '_self',
                        },
                        method: 'post',
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            if (result.success) {
                                Ext.Msg.alert("提示", "保存成功！")
                            } else {
                                Ext.Msg.alert("提示", "保存失败！")
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    initForm: function (panel) {
        var me = this;
        panel.down('toolbar').insert(0, [{
            text: '新建',
            scope: this,
            handler: function () {
                this.reSetForm();
            }
        }, {
            xtype: 'deletebutton',
            beforeDelete: function () {
                if (panel.getForm().findField("LHB_CD").value != null && panel.getForm().findField("水利工程项目_ID").value != null) {
                    return true;
                }
                return false;
            },
            getDeleteRows: function () {
                return {
                    dbName: '_self',
                    formFields: [{
                        tableName: 'WR_LHB_T',
                        rowKey: 'LHB_CD',
                        rowKeyValue: panel.getForm().findField("LHB_CD").value
                    }, {
                        tableName: 'zdst_水利工程项目简表',
                        rowKey: '水利工程项目_ID',
                        rowKeyValue: panel.getForm().findField("水利工程项目_ID").value
                    },{
                        tableName: 'ZDST_REL_水利工程项目与水体',
                        rowKey: '水利工程项目_ID',
                        rowKeyValue: panel.getForm().findField("水利工程项目_ID").value
                    }]
                };
            },
            deleteSuccess: function () {
                me.form.getForm().reset();
                me.form.getForm().getFields().each(function (field) {
                    field.rowKeyValue = null;
                });
                me.gridview.reload();
            }
        }]);
    },
    selectStRecords: function (records) {
        var grid = this.stGrid.grid;
        grid.selectRecords(function (record) {
            return records.indexOf(record.get('水体_ID')) >= 0;
        });
    },
    reSetForm: function (record) {
        this.form.setValues([{
            name: '水利工程项目_ID',
            value: record ? record.get('水利工程项目_ID') : null,
            rowKeyValue: record ? record.get('水利工程项目_ID') : null
        }, {
            name: '经纬度坐标',
            value: record ? record.get('经纬度坐标') : null,
            rowKeyValue: record ? record.get('水利工程项目_ID') : null
        }, {
            name: 'LHB_CD',
            value: record ? record.get('拦河坝代码') : null,
            rowKeyValue: record ? record.get('拦河坝代码') : null
        }, {
            name: 'LHB_NM',
            value: record ? record.get('拦河坝名称') : null,
            rowKeyValue: record ? record.get('拦河坝代码') : null
        }, {
            name: 'LENGTH',
            value: record ? record.get('坝长') : null,
            rowKeyValue: record ? record.get('拦河坝代码') : null
        }, {
            name: 'HIGH',
            value: record ? record.get('坝高') : null,
            rowKeyValue: record ? record.get('拦河坝代码') : null
        }, {
            name: 'STORAGE_V',
            value: record ? record.get('蓄水量') : null,
            rowKeyValue: record ? record.get('拦河坝代码') : null
        }, {
            name: 'NT',
            value: record ? record.get('备注') : null,
            rowKeyValue: record ? record.get('拦河坝代码') : null
        },{
            name: 'TS',
            value: null,
            rowKeyValue: record ? record.get('拦河坝代码') : null
        }, {
            name: 'WR_SD_CODE',
            value: null,
            rowKeyValue: record ? record.get('水利工程项目_ID') : null
        },{
            name: 'type_id',
            value: 8,
            rowKeyValue: record ? record.get('水利工程项目_ID') : null
        }]);

    }
});
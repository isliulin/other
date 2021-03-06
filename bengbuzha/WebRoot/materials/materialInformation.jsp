<%@page import="com.bitc.jk.xmis.util.JSONUtils"%>
<%@page import="com.bitc.jk.xmis.util.WebUtil"%>
<%@page import="net.sf.json.JsonConfig"%>
<%@page import="net.sf.json.JSONSerializer"%>
<%@page contentType="text/html; charset=utf-8"%>
<%@page import="com.bitc.jk.xmis.model.device.DeviceInfo" %>
<%@ page import="com.bitc.jk.xmis.model.EmployeeObj"%>
<!DOCTYPE HTML >
<%
DeviceInfo dfoa=(DeviceInfo)request.getAttribute("dfo");
EmployeeObj emp = (EmployeeObj) request.getSession().getAttribute(
		WebKeys.Session_Attribute_Name_UserDNA);

boolean decisionFlag = emp.hasDecisionRole();
boolean readOnly = emp.isReadOnly();
%>
<html>
  <head>
  <%@include file="../jsCss.jsp" %>
    
    
    <script type="text/javascript" src="<%=path%>/resources/js/SearchField.js"></script>
    <script type="text/javascript" src="<%=path%>/resources/js/InklingSearchField.js"></script>
    <script type="text/javascript" src="<%=path%>/workflow/js/TodoInfoPanel.js"></script>
    <script type="text/javascript" src="<%=path%>/device/DeviceGridPanel.js"></script>
    <script type="text/javascript" src="<%=path%>/organization/OrgTreePanel.js"></script>
    <script type="text/javascript" src="<%=path%>/resources/js/ItemSelector.js"></script>
    <script type="text/javascript" src="<%=path%>/resources/js/ChooseOrgTreeField.js"></script>
    <script type="text/javascript" src="<%=path%>/resources/js/Attention.js"></script>
    
    <script type="text/javascript" src="<%=path%>/resources/js/MultiSelect.js"></script>
    <script type="text/javascript" src="<%=path %>/crm/AddressChooseField.js"></script>
    <script type="text/javascript" src="<%=path%>/resources/js/conInfoObjCom.js"></script>
    
    <script type="text/javascript" src="<%=path%>/resources/js/Attachment.js"></script>
    <script type="text/javascript" src="<%=path%>/resources/js/Ext.ux.grid.RowActions.js"></script>
    <script type="text/javascript" src="<%=path%>/resources/upload/swfupload.js"></script>
	<script type="text/javascript" src="<%=path%>/resources/upload/uploaderPanel.js"></script>
    <script type="text/javascript" src="<%=path%>/organization/companyTree.js"></script>
    
    
    <script type="text/javascript" src="<%=path%>/resources/js/ChooseField.js"></script>
        <script type="text/javascript" src="<%=path%>/materials/materialInformation.js"></script>
      <script type="text/javascript">
	var decisionFlag = <%=decisionFlag%>;
	var readOnly = <%=readOnly%>;
</script>

     <script type="text/javascript">
     var dfo = null;
     var materialsID = null;
      <%
      if(dfoa!=null && dfoa.getId()!= null){
      	out.print("dfo = " + dfoa.toJsonString()+";");
      	out.print("materialsID = '" + dfoa.getId()+"';");
      }
      Map map=(Map)request.getAttribute("pricemap");
      
      if(dfoa!=null){
        	out.print("var map = " +JSONUtils.toJSON(map, true).toString()+";");
        } else {
      	out.print("var map = null;");
        }
      %>
      var empName="<%=emp.getUserName()%>";
      var empID="<%=emp.getUserID()%>";
    </script>
     <%WebUtil.outputRequestParameterAsScript(request,out,"request"); %>
  </head>
  <body>
  </body>
</html>



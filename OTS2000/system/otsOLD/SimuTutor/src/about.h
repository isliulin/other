#ifndef _ABOUT_H_
#define _ABOUT_H_

#include "ui_about.h"
#include "/home/ems/system/ots/ots_hdb/inc/ots_hdb.h" 

class CAboutTable : public QDialog,public Ui_CAboutTable
{
	Q_OBJECT
	public:
		CAboutTable(QWidget *parent=0);
		void loadChinese();
		void loadEnglish();
	private:
	private slots:
};
#endif
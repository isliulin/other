/****************************************************************************
** Meta object code from reading C++ file 'mapthread.h'
**
** Created: Wed Jan 14 10:22:27 2015
**      by: The Qt Meta Object Compiler version 61 (Qt 4.5.2)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../src/cserver/mapthread.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'mapthread.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 61
#error "This file was generated using the moc from 4.5.2. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_MapThread[] = {

 // content:
       2,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   12, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors

 // slots: signature, parameters, type, tag, flags
      11,   10,   10,   10, 0x0a,
      23,   10,   10,   10, 0x0a,
      33,   10,   10,   10, 0x0a,
      46,   10,   10,   10, 0x0a,

       0        // eod
};

static const char qt_meta_stringdata_MapThread[] = {
    "MapThread\0\0sendFrame()\0newData()\0"
    "newCommand()\0quit()\0"
};

const QMetaObject MapThread::staticMetaObject = {
    { &QThread::staticMetaObject, qt_meta_stringdata_MapThread,
      qt_meta_data_MapThread, 0 }
};

const QMetaObject *MapThread::metaObject() const
{
    return &staticMetaObject;
}

void *MapThread::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_MapThread))
        return static_cast<void*>(const_cast< MapThread*>(this));
    return QThread::qt_metacast(_clname);
}

int MapThread::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QThread::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: sendFrame(); break;
        case 1: newData(); break;
        case 2: newCommand(); break;
        case 3: quit(); break;
        default: ;
        }
        _id -= 4;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
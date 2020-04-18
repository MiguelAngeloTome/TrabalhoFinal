const sqlite3 = require ('sqlite3').verbose();
const path = require ('path');

const db = new sqlite3.Database(
    path.resolve (__dirname,'..','TempDb','raw_sqlite.db'),
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err=> {
        if(err) console.error(err.message);
        else console.log ('Connected')
    }
);

db.run(`create table if not exists data (
        'data_id' varchar(36) primary key,
        'Date' varchar(30),
        'temp' float,
        'air_humidity' float,
        'solo_humidity' float,
        'isWet' boolean,
        'pluviosidade' float,
        'vel_vento' float,
        'dir_vento' varchar(10),
        'radiacao' float
)`);

module.exports = db;
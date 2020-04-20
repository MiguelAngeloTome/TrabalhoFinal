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

db.run(`create table if not exists data(
        'data_id' varchar(36) primary key,
        'date' varchar(30),
        'temp' float,
        'air_humidity' float,
        'solo_humidity' float,
        'isWet' boolean,
        'pluviosidade' float,
        'vel_vento' float,
        'dir_vento' varchar(10),
        'radiacao' float)`
);

db.run(`create table if not exists user(
        'user_id' varchar(36) primary key,
        'name' varchar(30),
        'email' varchar(30),
        'password' varchar(30),
        'username' varchar(30))`
);

db.run(`create table if not exists module(
        'module_id' varchar(36) primary key,
        'localizacao' varchar(30),
        'dono' varchar(30))`
);

db.run(`create table if not exists user_module(
        'user_id' varchar(36),
        'module_id' varchar(36),
        primary key (user_id, module_id),
        foreign key (user_id) REFERENCES user(user_id),
        foreign key (module_id) REFERENCES module(module_id))`
);

module.exports = db;
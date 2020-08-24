const sqlite3 = require ('sqlite3').verbose();
const path = require ('path');
const { Transform } = require('stream');

const db =  new sqlite3.Database(
    path.resolve (__dirname,'..','TempDb','raw_sqlite.db'),
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err=> {
        if(err) console.error(err.message);
        else console.log ('Connected')
    }
);

db.run(`create table if not exists user(
        'user_id' varchar(36) primary key,
        'username' varchar(30),
        'password' varchar(200),
        'email' varchar(30),
        'dataIv' varchar(200),
        'name' varchar(30),
        'surname' varchar(30),
        'type' varchar(30))`
);

db.run(`create table if not exists vinha(
        'vinha_id' varchar(36) primary key,
        'Nome' varchar(50),
        'lat' varchar(30),
        'lng' varchar(30),
        'localizacao' varchar(30),
        'dono' varchar(36))`
);

db.run(`create table if not exists module(
        'module_id' varchar(36) primary key,
        'vinha_id' varchar(36),
        'localizacao' varchar(30),
        'lat' varchar(30),
        'lng' varchar(30),
        foreign key (vinha_id) REFERENCES vinha(vinha_id))`
);

db.run(`create table if not exists moduleList(
        'module_id' varchar(36) primary key)`
);

db.run(`create table if not exists data(
        'data_id' varchar(36) primary key,
        'module_id' varchar(36),
        'date' datetime,
        'temp' float,
        'air_humidity' float,
        'solo_humidity' float,
        'isWet' int,
        'pluviosidade' float,
        'vel_vento' float,
        'dir_vento' int,
        'radiacao' float,
        foreign key (module_id) REFERENCES module(module_id))`
);

db.run(`create table if not exists vinha_user(
        id varchar(36) Primary Key,
        'user_id' varchar(36),
        'vinha_id' varchar(36),
        foreign key (user_id) REFERENCES user(user_id),
        foreign key (vinha_id) REFERENCES vinha(vinha_id))`
);

db.run(`create table if not exists avisos(
        id varchar(36) NOT NULL primary key,
        nomeVinha varchar(50),
        module_id varchar(36),
        msgErro varchar(36),
        prioridade int,
        hora varchar(20))`
);

module.exports = db;
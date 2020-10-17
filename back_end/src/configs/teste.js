var mysql = require('mysql');
const path = require ('path');
const { Transform } = require('stream');
const os = require( 'os' );

var db = mysql.createConnection({
    host: "193.137.5.79",
    user: "khem",
    password: "khem",
    database: "khem",
    port: 1022
  });

  

var networkInterfaces = os.networkInterfaces( );

console.log( networkInterfaces );
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  db.query(`create table if not exists user(
    user_id varchar(36) primary key,
    username varchar(30),
    password varchar(200),
    email varchar(30),
    dataIv varchar(200),
    name varchar(30),
    surname varchar(30),
    type varchar(30))`
);

db.query(`create table if not exists vinha(
    vinha_id varchar(36) primary key,
    Nome varchar(50),
    lat varchar(30),
    lng varchar(30),
    localizacao varchar(30),
    dono varchar(36))`
);

db.query(`create table if not exists module(
    module_id varchar(36) primary key,
    vinha_id varchar(36),
    localizacao varchar(30),
    lat varchar(30),
    lng varchar(30),
    foreign key (vinha_id) REFERENCES vinha(vinha_id))`
);

db.query(`create table if not exists moduleList(
    module_id varchar(36) primary key)`
);

db.query(`create table if not exists data(
    data_id varchar(36) primary key,
    module_id varchar(36),
    date datetime,
    temp float,
    air_humidity float,
    solo_humidity float,
    isWet int,
    pluviosidade float,
    vel_vento float,
    dir_vento int,
    radiacao float,
    foreign key (module_id) REFERENCES module(module_id))`
);

db.query(`create table if not exists vinha_user(
    id varchar(36) Primary Key,
    user_id varchar(36),
    vinha_id varchar(36),
    foreign key (user_id) REFERENCES user(user_id),
    foreign key (vinha_id) REFERENCES vinha(vinha_id))`
);

db.query(`create table if not exists avisos(
    id varchar(36) NOT NULL primary key,
    nomeVinha varchar(50),
    module_id varchar(36),
    msgErro varchar(100),
    prioridade int,
    hora varchar(20),
    dia date)`
);

db.query(`create table if not exists userPrefs(
    vinha_id varchar(36),
    user_id varchar(36),
    tempMin float,
    tempMax float,
    airHumidityMin float,
    airHumidityMax float,
    soloHumidityMin float,
    soloHumidityMax float,
    isWetMin int,
    isWetMax int,
    pluviosidadeMin float,
    pluviosidadeMax float,
    velVentoMin float,
    velVentoMax float,
    dirVentoMin int,
    dirVentoMax int,
    radiacaoMin float,
    radiacaoMax float,
    foreign key (user_id) REFERENCES user(user_id),
    foreign key (vinha_id) REFERENCES vinha(vinha_id),
    primary key(vinha_id, user_id))`
);

module.exports = db;
const db = require('../configs/teste.js');
const avisos = require('../Avisos/Verificacao.js');
const excelService  = require('./excel-service');
const vinhaService = require ('./vinha-service');

const uuid = require('uuid').v4;

//Retorna todos os datas
exports.getData = async () => {
    return new Promise((resolve, reject) => {
        db.query(`select * from data `,
            (err, row) => {
                if (err) reject(err);
                resolve(row);

            });
    });
}

//Retorna um data atraves do seu id
exports.getDataSingle = id => {
    return new Promise((resolve, reject) => {
        db.query(`select * from data 
                where data_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);

            });
    });
}

exports.getMaxDataTimeFrame = (id, body) => {
    return new Promise((resolve, reject) => {
        db.query(`select max(temp) as temp,
                max(air_humidity) as air_humidity,
                max(solo_humidity) as solo_humidity,
                max(isWet) as isWet,
                max(pluviosidade) as pluviosidade,
                max(vel_vento) as vel_vento,
                max(dir_vento) as dir_vento,
                max(radiacao) as radiacao
                from data 
                where concat(YEAR(date), "-", month(date), "-", day(date), " ", hour(date), ":", minute(date),":", second(date)) > ?
                and concat(YEAR(date), "-", month(date), "-", day(date), " ", hour(date), ":", minute(date),":", second(date)) < ?
                and module_id = ?`, [body.timeInic , body.timeFin , id],
                (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

exports.getMinDataTimeFrame = (id, body) => {
    return new Promise((resolve, reject) => {
        db.query(`select min(temp) as temp,
                min(air_humidity) as air_humidity,
                min(solo_humidity) as solo_humidity,
                min(isWet) as isWet,
                min(pluviosidade) as pluviosidade,
                min(vel_vento) as vel_vento,
                min(dir_vento) as dir_vento,
                min(radiacao) as radiacao
                from data 
                where concat(YEAR(date), "-", month(date), "-", day(date), " ", hour(date), ":", minute(date),":", second(date)) > ?
                and concat(YEAR(date), "-", month(date), "-", day(date), " ", hour(date), ":", minute(date),":", second(date)) < ?
                and module_id = ?`, [body.timeInic , body.timeFin , id],
                (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

exports.getAvgDataTimeFrame = (id, body) => {
    return new Promise((resolve, reject) => {
        db.query(`select CAST(avg(temp) as decimal (10, 1)) as temp,
                CAST(avg(air_humidity) as decimal (10, 1)) as air_humidity,
                CAST(avg(solo_humidity) as decimal (10, 1)) as solo_humidity,
                CAST(avg(isWet) as decimal (10, 1)) as isWet,
                CAST(avg(pluviosidade) as decimal (10, 1)) as pluviosidade,
                CAST(avg(vel_vento) as decimal (10, 1)) as vel_vento,
                CAST(avg(dir_vento) as decimal (10, 1)) as dir_vento,
                CAST(avg(radiacao) as decimal (10, 1)) as radiacao
                from data 
                where concat(YEAR(date), "-", month(date), "-", day(date), " ", hour(date), ":", minute(date),":", second(date)) > ?
                and concat(YEAR(date), "-", month(date), "-", day(date), " ", hour(date), ":", minute(date),":", second(date)) < ?
                and module_id = ?`, [body.timeInic , body.timeFin , id],
                (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

//Retorna todos os datas de um modulo atraves do seu module id
exports.getDataModule = id => {
    return new Promise((resolve, reject) => {
        db.query(`select * from data 
                where module_id = ? order by date desc`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);

            });
    });
}

//Retorna o ultimo data de um modulo atraves do seu module id
exports.getDataModuloLast = id => {
    return new Promise((resolve, reject) => {
        db.query(`select * from data 
                where module_id = ? 
                order by date desc limit 1`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);

            });
    });
}

//Retorna data de um modulo, num determinado time frame atraves do module id, tempo inicial e tempo final (dentro do body)
exports.getDataTimeFrame = (id, body) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from data 
                where date > ? 
                and date < ? 
                and module_id =? 
                order by date asc`,
            [body.time1, body.time2, id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

//Inserir novo data
exports.insertData = async body => {
    let vinha_id = await vinhaService.getVinhaFromModule(body.module_id);
    vinha_id = vinha_id[0].vinha_id;
    let user_id = await vinhaService.getDonoVinha(vinha_id);
    user_id = user_id[0].dono

    let mail = await excelService.getUsersEmailsFromModule(body.module_id);

    avisos.verifica(vinha_id, user_id, body.module_id, body.date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao, mail);
    return new Promise((resolve, reject) => {
        const id = uuid();
        db.query(`insert into data(data_id, module_id, date, temp, air_humidity, solo_humidity, isWet, pluviosidade, vel_vento, dir_vento, radiacao) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [id, body.module_id, body.date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao],
            err => {
                if (err) reject(err);
                resolve({ inserted: 1, data_id: id });
            });
    });
};

//Remover data
exports.removeData = id => {
    return new Promise((resolve, reject) => {
        db.query(`delete from data where data_id = ?`, [id],
            err => {
                if (err) reject(err);
                resolve({ removed: 1, data_id: id });
            });
    });
};

//Update data
exports.updateData = (id, body) => {
    return new Promise((resolve, reject) => {
        db.query(`update data set module_id = ?, date = ?, temp = ?, air_humidity = ?, solo_humidity = ?, isWet = ?, pluviosidade = ?, vel_vento = ?, dir_vento = ?, radiacao = ? 
                  where data_id = ?`,
            [body.module_id, body.date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao, id],
            err => {
                if (err) reject(err);
                resolve({ updated: 1, data_id: id });
            });
    });
};
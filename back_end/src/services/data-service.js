const db = require('../configs/mysql.js');
const avisos = require('../Avisos/Verificacao.js');
const userAvisos = require('./userAvisos.js');

const uuid = require('uuid').v4;

//Retorna todos os datas
exports.getData = async () => {
    return new Promise((resolve, reject) => {
        db.all(`select * from data`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

//Retorna um data atraves do seu id
exports.getDataSingle = id => {
    return new Promise((resolve, reject) => {
        db.all(`select * from data 
                where data_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);

            });
    });
}

//Retorna todos os datas de um modulo atraves do seu module id
exports.getDataModule = id => {
    return new Promise((resolve, reject) => {
        db.all(`select * from data 
                where module_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);

            });
    });
}

//Retorna o ultimo data de um modulo atraves do seu module id
exports.getDataModuloLast = id => {
    return new Promise((resolve, reject) => {
        db.all(`select * from data 
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
        db.all(`select * from data 
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
    let mail = await excelService.getUsersEmailsFromModule(body.module_id);
    avisos.verifica(body.module_id, body.date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao, mail);
    return new Promise((resolve, reject) => {
        const id = uuid();
        db.run(`insert into data(data_id, module_id, date, temp, air_humidity, solo_humidity, isWet, pluviosidade, vel_vento, dir_vento, radiacao) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
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
        db.run(`delete from data where data_id = ?`, [id],
            err => {
                if (err) reject(err);
                resolve({ removed: 1, data_id: id });
            });
    });
};

//Update data
exports.updateData = (id, body) => {
    return new Promise((resolve, reject) => {
        db.run(`update data set module_id = ?, date = ?, temp = ?, air_humidity = ?, solo_humidity = ?, isWet = ?, pluviosidade = ?, vel_vento = ?, dir_vento = ?, radiacao = ? where data_id = ?`,
            [body.module_id, body.date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao, id],
            err => {
                if (err) reject(err);
                resolve({ updated: 1, data_id: id });
            });
    });
};
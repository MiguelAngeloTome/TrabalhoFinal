const uuid = require('uuid').v4;
const db = require('../configs/teste.js');

exports.getSensores = () => {
    return new Promise((resolve, reject) => {
        db.query(`select * from sensores`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

exports.getSensorSingle = id => {
    return new Promise((resolve, reject) => {
        db.query(`select * from sensores
                where sensor_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

exports.getSensorModule = id => {
    return new Promise((resolve, reject) => {
        db.query(`select * from sensores
                where module_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

exports.insertSensor = body => {
    return new Promise((resolve, reject) => {
        const id = uuid();
        db.query(`insert into sensores(sensor_id, module_id, nome, tipo, dataInserido)
                values(?,?,?,?,?)`, [id, body.module_id, body.nome, body.tipo, body.dataInserido], (err, row) => {
            if (err) reject(err);
            resolve({ inserted: 1, sensor_id: id });
        });
    });
}

exports.updateSensor = (id, body) => {
    return new Promise((resolve, reject) => {
        db.query(`update sensores 
                set module_id = ?,
                nome = ?,
                tipo = ?,
                dataInserido = ? 
                where sensor_id = ?`,
            [body.module_id, body.nome, body.tipo, body.dataInserido, id],
            err => {
                if (err) reject(err);
                resolve({ updated: 1, sensor_id: id });
            });
    });
};

exports.removeSensor = id => {
    return new Promise((resolve, reject) => {
        db.query(`delete from sensores 
                where sensor_id = ?`, [id],
            err => {
                if (err) reject(err);
                resolve({ removed: 1, sensor_id: id });
            });
    });
};
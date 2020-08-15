const testing = require("../Calc/PInfeccao.js")
const db = require('../configs/mysql.js');

const uuid = require('uuid').v4;

exports.getData = async() =>{
    let a = await testing.Phumectacao("2009-06-29", "2009-06-30", "eadb8670-9c55-4298-8696-56d0c8040da0");
    console.log(a);
    return new Promise((resolve,reject)=>{
        db.all(`select * from data`,(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.getAvisos = () =>{
    return new Promise((resolve,reject)=>{
        db.all(`select * from avisos`,(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.getDataSingle = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`select * from data where data_id = ?`, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
            
        });
    });
}

exports.getAvisoSingle = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`select * from avisos where id = ?`, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
            
        });
    });
}

exports.getDataModule = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`select * from data where module_id = ?`, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
            
        });
    });
}

exports.getDataLast = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`select * from data where module_id = ? order by date desc limit 1`, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
            
        });
    });
}
exports.getDataTimeFrame = (id,body) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select * from data where date > ? and date < ? and module_id =? order by date asc`,
        [body.time1, body.time2, id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.insertData = body =>{
    return new Promise((resolve,reject)=>{
        const id = uuid();
        db.run(`insert into data(data_id, module_id, date, temp, air_humidity, solo_humidity, isWet, pluviosidade, vel_vento, dir_vento, radiacao) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
        [id, body.module_id, body.date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao],
        err=>{
            if(err) reject (err);
            resolve({inserted:1, data_id: id});
        });
    });
};

exports.removeData = id =>{
    return new Promise((resolve,reject)=>{
        db.run(`delete from data where data_id = ?`, [id],
        err=>{
            if(err) reject (err);
            resolve({removed:1, data_id: id});
        });
    });
};

exports.removeAviso = id =>{
    return new Promise((resolve,reject)=>{
        db.run(`delete from avisos where id = ?`, [id],
        err=>{
            if(err) reject (err);
            resolve({removed:1, data_id: id});
        });
    });
};

exports.updateData = (id, body) =>{
    return new Promise((resolve,reject)=>{
        db.run(`update data set module_id = ?, date = ?, temp = ?, air_humidity = ?, solo_humidity = ?, isWet = ?, pluviosidade = ?, vel_vento = ?, dir_vento = ?, radiacao = ? where data_id = ?`,
        [body.module_id, body.date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao, id],
        err=>{
            if(err) reject (err);
            resolve({updated:1, data_id: id});
        });
    });
};
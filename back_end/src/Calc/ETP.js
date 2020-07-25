const db = require('../configs/mysql.js');

exports.getMedTemp = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select avg(temp) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getMaxTemp = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select max(temp) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getMinTemp = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select min(temp) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getRadMed = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select avg(radiacao) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getHumMax = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select max(air_humidity) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getHumMin = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select min(air_humidity) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getVentoMed = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select avg(vel_vento) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getLat = async(module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select lat from module
                where module_id like ?`,[module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getLng = async(module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select lng from module
                where module_id like ?`,[module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

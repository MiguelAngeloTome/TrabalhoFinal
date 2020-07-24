const db = require('../configs/mysql.js');

exports.getStuff = async() =>{
    let test = [];
    return new Promise((resolve,reject)=>{
        db.all(`select * from data`,(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};


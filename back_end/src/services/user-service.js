const db = require('../configs/mysql.js');

const uuid = require('uuid').v4;

exports.getUser = () =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * From user`,(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.getUserSingle = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * From user where user_id = ?`, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.insertUser = body =>{
    return new Promise((resolve,reject)=>{
        const id = uuid();
        db.run(`insert into user(user_id, name, email, password, username) VALUES(?,?,?,?,?)`,
        [id, body.name, body.email, body.password, body.username],
        err=>{
            if(err) reject (err);
            resolve({inserted:1, user_id: id});
        });
    });
};

exports.removeUser = id =>{
    return new Promise((resolve,reject)=>{
        db.run(`delete from user where user_id = ?`, [id],
        err=>{
            if(err) reject (err);
            resolve({removed:1, user_id: id});
        });
    });
};

/*
updateData
*/
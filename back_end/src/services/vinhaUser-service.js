const db = require('../configs/mysql.js');

const uuid = require('uuid').v4;

exports.getVinha = () =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * from vinha_user`,(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}
exports.getVinhaSingle = id =>{
    return new Promise((resolve,reject)=>{
        let send =[] ;
        db.all(`Select * from vinha_user where user_id = ?`, [id],
        (err,row)=>{
            if(err){
              reject (err);  
            }else{
                for(i=0; i<row.length;i++){
                    db.all(`Select * from vinha where vinha_id = ?`, [row[i].vinha_id],
                      (err,row2)=>{
                          if(err){
                              reject(err)
                          }else{
                             send.push(row2[0]);
                             if(send.length==row.length){
                                resolve(send);
                             }

                          }
                      }  
                    )
                }
                
               // resolve(send);
            }
            
        });
    });
}

exports.add = body => {
    return new Promise((resolve, reject) => {
        const id = uuid();
        db.run(`insert into vinha_user(id, user_id, vinha_id) VALUES(?,?,?)`,
            [id,body.user_id, body.vinha_id],
            err => {
                if (err) reject(err);
                resolve({ inserted: 1});
            });
    });
};
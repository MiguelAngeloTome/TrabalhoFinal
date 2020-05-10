const db = require('../configs/mysql.js');
const cipher = require('../helpers/cipher.js')
const roles = require('../helpers/roles.js')

const uuid = require('uuid').v4;


exports.register = (username, rawPassword, email, name, type) => {
    return new Promise((resolve, reject) => {
        const id = uuid();
        try {
            db.all(`Select * from user where username = ?`, [username],
                (err, row) => {
                    if (err) {
                        reject(err);
                       
                    }
                    console.log("here");
                    if (row.length < 1) {
                        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(rawPassword)) {
                            const dataIv = cipher.generateIv();
                            const password = cipher.encrypt(rawPassword, dataIv);
                            db.run(`insert into user(user_id, username, password, email, dataIv, name, type) VALUES(?,?,?,?,?,?,?)`,
                                [id, username, password, email, dataIv, name, type],
                                err => {
                                    if (err){
                                        
                                        reject(err);

                                    }else{
                                     
                                        resolve({ inserted: 1, user_id: id });
                                    }
                                    
                                });
                        } else reject("invalid password")
                    } else reject("username in use")

                });
        } catch (error) {
            console.log("hello");

        }
    })

};

exports.authenticate = (username, rawPassword) => {
    return new Promise((resolve, reject) => {
        db.all(`Select * from user where username = ?`, [username],
            (err, row) => {
                if (err) {
                    reject(err);
                }
                if (row.length > 0) {
                    const password = cipher.decrypt(row[0].password, row[0].dataIv);
                    if (password == rawPassword){
                        resolve({ id: row[0].user_id});
                    } else{
                        reject(new Error("Wrong password"));
                    }
                }
                reject(new Error("Username not found"));
            });
    }
    )
};


exports.getUser = () => {
    return new Promise((resolve, reject) => {
        db.all(`Select * From user`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

exports.getUserSingle = id => {
    return new Promise((resolve, reject) => {
        db.all(`Select * From user where user_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

exports.insertUser = body => {
    return new Promise((resolve, reject) => {
        const id = uuid();
        db.run(`insert into user(user_id, username, password, email, dataIv, name, type) VALUES(?,?,?,?,?,?,?)`,
            [id, body.name, body.email, body.password, body.username],
            err => {
                if (err) reject(err);
                resolve({ inserted: 1, user_id: id });
            });
    });
};

exports.removeUser = id => {
    return new Promise((resolve, reject) => {
        db.run(`delete from user where user_id = ?`, [id],
            err => {
                if (err) reject(err);
                resolve({ removed: 1, user_id: id });
            });
    });
};

exports.updateUser = (id, body) => {
    return new Promise((resolve, reject) => {
        db.run(`update user set username = ?, password = ?, email = ?, dataIv = ?, name = ?, type = ? where user_id = ?`,
            [body.username, body.password, body.email, body.dataIv, body.name, body.type, id],
            err => {
                if (err) reject(err);
                resolve({ updated: 1, user_id: id });
            });
    });
};

exports.ligacao = body => {
    return new Promise((resolve, reject) => {
        db.run(`insert into vinha_user(user_id, vinha_id) VALUES(?,?)`,
            [body.user_id, body.vinha_id],
            err => {
                if (err) reject(err);
                resolve({ inserted: 1, user_id: id });
            });
    });
};
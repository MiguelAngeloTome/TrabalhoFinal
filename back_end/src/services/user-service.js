const db = require('../configs/teste.js');
const cipher = require('../helpers/cipher.js')
const roles = require('../helpers/roles.js')
const uuid = require('uuid').v4;

//Registar um user
exports.register = (username, rawPassword, email, name, surname, type) => {
    return new Promise((resolve, reject) => {
        const id = uuid();
        try {
            db.query(`Select * from user where username = ?`, [username],
                (err, row) => {
                    if (err) {
                        reject(err);

                    }
                    if (row.length < 1) {
                        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(rawPassword)) {
                            const dataIv = cipher.generateIv();
                            const password = cipher.encrypt(rawPassword, dataIv);
                            db.query(`insert into user(user_id, username, password, email, dataIv, name, surname, type) VALUES(?,?,?,?,?,?,?,?)`,
                                [id, username, password, email, dataIv, name, surname, type],
                                err => {
                                    if (err) {

                                        reject(err);

                                    } else {

                                        resolve({ inserted: 1, user_id: id });
                                    }

                                });
                        } else reject("invalid password")
                    } else reject("username in use")

                });
        } catch (error) {
        }
    })

};

//Verificar se o user existe na base de dados e fazer login
exports.authenticate = (username, rawPassword) => {
    return new Promise((resolve, reject) => {
        db.query(`Select * from user where username = ?`, [username],
            (err, row) => {
                if (err) {
                    reject(err);
                }
                if (row.length > 0) {
                    const password = cipher.decrypt(row[0].password, row[0].dataIv);
                    if (password == rawPassword) {
                        resolve({ id: row[0].user_id, name: row[0].name, surname: row[0].surname });
                    } else {
                        reject(new Error("Wrong password"));
                    }
                }
                reject(new Error("Username not found"));
            });
    }
    )
};

//Retorna todos os users
exports.getUser = () => {
    return new Promise((resolve, reject) => {
        db.query(`Select * From user`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

//Retorna user atraves do seu id
exports.getUserSingle = id => {
    return new Promise((resolve, reject) => {
        db.query(`Select * From user 
                where user_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

//Remover user
exports.removeUser = id => {
    return new Promise((resolve, reject) => {
        db.query(`delete from user where user_id = ?`, [id],
            err => {
                if (err) reject(err);
                resolve({ removed: 1, user_id: id });
            });
    });
};

//Update user
exports.updateUser = (id, body) => {
    return new Promise((resolve, reject) => {
        db.query(`update user set username = ?, password = ?, email = ?, dataIv = ?, name = ?, type = ? where user_id = ?`,
            [body.username, body.password, body.email, body.dataIv, body.name, body.type, id],
            err => {
                if (err) reject(err);
                resolve({ updated: 1, user_id: id });
            });
    });
};

//Retorna o user id, username, nome, sobre-nome de todos os users
exports.getUserSimple = () => {
    return new Promise((resolve, reject) => {
        db.query(`Select user_id, username, name, surname From user`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}
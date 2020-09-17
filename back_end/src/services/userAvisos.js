const db = require('../configs/mysql.js');

exports.getUserAvisos = async(id) => {
    let vinhas = await this.getUserVinhas(id);
    let modulos = []; 
    let alertas = [];
    for(let i = 0; i < vinhas.length; i++){
        let aux = await this.getUserModulos(vinhas[i].vinha_id);
        for(let j = 0; j < aux.length; j++){
            modulos.push(aux[j]);
        } 
    }
    for(let k = 0; k < modulos.length;k++){
        let aux2 = await this.getAvisos(modulos[k].module_id);
        for(let l = 0; l < aux2.length; l++){
            alertas.push(aux2[l]);
        }
    }
    return alertas;
}

exports.getAvisos = async(id) =>{
    return new Promise((resolve, reject) => {
        db.all(`select * from avisos 
                where module_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    }); 
}

exports.getUserModulos = async(id) =>{
    return new Promise((resolve, reject) => {
        db.all(`select module_id from module
                where vinha_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
    
}

exports.getUserVinhas = async(id) =>{
    return new Promise((resolve, reject) => {
        db.all(`select vinha_id from vinha_user
                where user_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

exports.CountUserAvisos = async (id) => {
    let avisos = await this.getUserAvisos(id);
    let count = 0;
    for(let i = 0; i < avisos.length; i++){
        count++;
    }
    return count;
;}
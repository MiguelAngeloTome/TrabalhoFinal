const db = require('../configs/mysql.js');
const uuid = require('uuid').v4;
const etp = require('../Calc/ETP.js');

exports.verifica = async (module_id, date, temp, air_humidity, solo_humidity, isWet, pluviosidade, vel_vento, dir_vento, radiacao) => {
    this.verData(date, module_id);
    this.verTemp(temp, module_id);
    this.verAirHum(air_humidity, module_id);
    this.verSoloHum(solo_humidity, module_id);
    this.verWet(isWet, module_id);
    this.verPluv(pluviosidade, module_id);
    this.verVelVento(vel_vento, module_id);
    this.verDirVento(dir_vento, module_id);
    this.verRadiacao(radiacao, module_id);
}

exports.GetHora = async() => {
    let hora = [hour, minute, second] = ( new Date() ).toLocaleTimeString().slice(0,7).split(":");
    return(hora[0] + ':' + hora[1] + ':' + hora[2]);
}

exports.GetNomeVinha = async(module_id) => {
    return new Promise((resolve,reject)=>{
        db.all(`select nome from vinha
                where vinha_id =
                (select vinha_id from module
                where module_id = ?)`, [module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row[0].Nome);
        });
    });
}

exports.verData = async(date, module_id) => { 
    //verificacao da data
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    let day = await etp.getFormatedDate(date);
    if(today != day){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "A data inserida esta errada", 1, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}

exports.verTemp = async(temp, module_id) =>{
    //Verificao da temperatura
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    if(temp < -10){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "Temperatura inserida e inferior a -10 graus", 2, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(temp > 50){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "Temperatura inserida e superior a 50 graus", 3, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verAirHum = async(air_humidity, module_id) =>{
    //verificacao da humidade do ar
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    if(air_humidity < 0){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do ar e inferior a 0%", 1, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(air_humidity > 100){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do ar e superior a 100%", 2, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verSoloHum = async(solo_humidity, module_id) =>{
    //verificacao da humidade do solo
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    if(solo_humidity < 0){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do solo e inferior a 0%", 3, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(solo_humidity > 100){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do solo e superior a 100%", 1, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }    
}
exports.verWet = async(isWet, module_id) =>{
    //verificacao de folha molhada
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    if(isWet < 0){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "O valor do sensor de folha molhada e inferior a 0", 2, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(isWet > 6999){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "O valor do sensor de folha molhada e superior a 6999", 3, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    } 
}
exports.verPluv = async(pluviosidade, module_id) =>{
    //verificacao da pluviosidade
}
exports.verVelVento = async(vel_vento, module_id) =>{
    //verificacao da velocidade do vento
}
exports.verDirVento = async(dir_vento, module_id) =>{
    //verificacao da direcao do vento
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    if(dir_vento < 0){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "A direcao do vento e inferior a 0", 1, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(dir_vento > 360){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "A direcao do vento e superior a 360", 2, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verRadiacao = async(radiacao, module_id) =>{
    //verificacao da direcao do vento
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    if(radiacao < 0){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "A radiacao e inferior a 0", 3, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(radiacao > 500){
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora) VALUES(?,?,?,?,?,?)`,
            [id, nome, module_id, "A radiacao e inferior a 500", 1, hora],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
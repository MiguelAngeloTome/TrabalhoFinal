const db = require('../configs/mysql.js');
const uuid = require('uuid').v4;
const etp = require('../Calc/ETP.js');
var nodemailer = require('nodemailer');
const xl = require('excel4node');

exports.verifica = async (module_id, date, temp, air_humidity, solo_humidity, isWet, pluviosidade, vel_vento, dir_vento, radiacao, mail) => {
    this.verData(mail, date, module_id);
    this.verTemp(mail, temp, module_id);
    this.verAirHum(mail, air_humidity, module_id);
    this.verSoloHum(mail, solo_humidity, module_id);
    this.verWet(mail, isWet, module_id);
    this.verPluv(mail, pluviosidade, module_id);
    this.verVelVento(mail, vel_vento, module_id);
    this.verDirVento(mail, dir_vento, module_id);
    this.verRadiacao(mail, radiacao, module_id);
}

exports.sendMail = async(mail, msg) => {
    for(i = 0; i < mail.length; i++){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'khemipt@gmail.com',
                pass: 'khemkhemipt'
            }
        });
    
        var mailOptions = {
            from: 'khemipt@gmail.com',
            to: mail[i].email,
            subject: 'Alerta nas vinhas',
            text: msg,
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

exports.GetHora = async() => {
    let hora = [hour, minute, second] = ( new Date() ).toLocaleTimeString().slice(0,7).split(":");
    return(hora[0] + ':' + hora[1] + ':' + hora[2]);
}

exports.GetNomeVinha = async(module_id) => {
    return new Promise((resolve,reject)=>{
        db.all(`select nome from vinha
                where vinha_id = (
                    select vinha_id from module
                    where module_id = ?
                )`, [module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row[0].Nome);
        });
    });
}

exports.verData = async(mail, date, module_id) => { 
    //verificacao da data
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    let day = await etp.getFormatedDate(date);
    if(today != day){
        await this.sendMail(mail,"A data inserida esta errada");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A data inserida esta errada", 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}

exports.verTemp = async(mail, temp, module_id) =>{
    //Verificao da temperatura
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(temp < -10){
        await this.sendMail(mail,"Temperatura inserida e inferior a -10 graus, gravidade 2");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "Temperatura inserida e inferior a -10 graus", 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(temp > 50){
        await this.sendMail(mail,"Temperatura inserida e superior a 50 graus, gravidade 2");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "Temperatura inserida e superior a 50 graus", 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verAirHum = async(mail, air_humidity, module_id) =>{
    //verificacao da humidade do ar
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(air_humidity < 0){
        await this.sendMail(mail,"A humidade do ar e inferior a 0%");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do ar e inferior a 0%", 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(air_humidity > 100){
        await this.sendMail(mail,"A humidade do ar e superior a 100%");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do ar e superior a 100%", 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verSoloHum = async(mail, solo_humidity, module_id) =>{
    //verificacao da humidade do solo
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(solo_humidity < 0){
        await this.sendMail(mail,"A humidade do solo e inferior a 0%");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do solo e inferior a 0%", 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(solo_humidity > 100){
        await this.sendMail(mail,"A humidade do solo e superior a 100%");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do solo e superior a 100%", 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }    
}
exports.verWet = async(mail, isWet, module_id) =>{
    //verificacao de folha molhada
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(isWet < 0){
        await this.sendMail(mail,"O valor do sensor de folha molhada e inferior a 0");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "O valor do sensor de folha molhada e inferior a 0", 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(isWet > 6999){
        await this.sendMail(mail,"O valor do sensor de folha molhada e superior a 6999");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "O valor do sensor de folha molhada e superior a 6999", 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    } 
}
exports.verPluv = async(mail, pluviosidade, module_id) =>{
    //verificacao da pluviosidade
}
exports.verVelVento = async(mail, vel_vento, module_id) =>{
    //verificacao da velocidade do vento
}
exports.verDirVento = async(mail, dir_vento, module_id) =>{
    //verificacao da direcao do vento
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(dir_vento < 0){
        await this.sendMail(mail,"A direcao do vento e inferior a 0");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A direcao do vento e inferior a 0", 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(dir_vento > 360){
        await this.sendMail(mail,"A direcao do vento e superior a 360");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A direcao do vento e superior a 360", 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verRadiacao = async(mail, radiacao, module_id) =>{
    //verificacao da direcao do vento
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(radiacao < 0){
        await this.sendMail(mail,"A radiacao e inferior a 0");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia-) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A radiacao e inferior a 0", 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(radiacao > 500){
        await this.sendMail(mail,"A radiacao e superior a 500");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.run(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A radiacao e superior a 500", 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
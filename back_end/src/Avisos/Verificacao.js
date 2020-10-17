const db = require('../configs/teste.js');
const uuid = require('uuid').v4;
const etp = require('../Calc/ETP.js');
var nodemailer = require('nodemailer');
const avisosService = require('../services/avisos-service')
//const xl = require('excel4node');

exports.verifica = async (vinha_id, user_id, module_id, date, temp, air_humidity, solo_humidity, isWet, pluviosidade, vel_vento, dir_vento, radiacao, mail) => {
    let prefs = await avisosService.getUserPrefsSingle({vinha_id:vinha_id, user_id:user_id});
    prefs = prefs[0];
    this.verData(mail, date, module_id);
    this.verTemp(prefs, mail, temp, module_id);
    this.verAirHum(prefs, mail, air_humidity, module_id);
    this.verSoloHum(prefs, mail, solo_humidity, module_id);
    this.verWet(prefs, mail, isWet, module_id);
    this.verPluv(prefs, mail, pluviosidade, module_id);
    this.verVelVento(prefs, mail, vel_vento, module_id);
    this.verDirVento(prefs, mail, dir_vento, module_id);
    this.verRadiacao(prefs, mail, radiacao, module_id);
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
            to: mail[i][0].email,
            subject: 'Alerta nas vinhas',
            text: msg,
        };
    
        transporter.sendMail(mailOptions, function(error, info){
        });
    }
}

exports.GetHora = async() => {
    let hora = [hour, minute, second] = ( new Date() ).toLocaleTimeString().slice(0,7).split(":");
    return(hora[0] + ':' + hora[1] + ':' + hora[2]);
}

exports.GetNomeVinha = async(module_id) => {
    return new Promise((resolve,reject)=>{
        db.query(`select nome from vinha
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
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A data inserida esta errada", 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}

exports.verTemp = async(prefs, mail, temp, module_id) =>{
    //Verificao da temperatura
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    
    if(temp < prefs.tempMin){
        await this.sendMail(mail, "A temperatura inserida foi " + temp + " graus, que é inferior ao valor limite de " + prefs.tempMin + " graus");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A temperatura inserida foi " + temp + " graus, que é inferior ao valor limite de " + prefs.tempMin + " graus", 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(temp > prefs.tempMax){
        await this.sendMail(mail,"A temperatura inserida foi " + temp + " graus, que é superior ao valor limite de " + prefs.tempMax + " graus");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A temperatura inserida foi " + temp + " graus, que é superior ao valor limite de " + prefs.tempMax + " graus", 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verAirHum = async(prefs, mail, air_humidity, module_id) =>{
    //verificacao da humidade do ar
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(air_humidity < prefs.airHumidityMin){
        await this.sendMail(mail,"A humidade do ar inserida foi de " + air_humidity + "%, que é inferior ao valor limite de " + prefs.airHumidityMin + "%");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do ar inserida foi de " + air_humidity + "%, que é inferior ao valor limite de " + prefs.airHumidityMin + "%", 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(air_humidity > prefs.airHumidityMax){
        await this.sendMail(mail,"A humidade do ar inserida foi de " + air_humidity + "%, que é superior ao valor limite de " + prefs.airHumidityMax + "%");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do ar inserida foi de " + air_humidity + "%, que é superior ao valor limite de " + prefs.airHumidityMax + "%", 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verSoloHum = async(prefs, mail, solo_humidity, module_id) =>{
    //verificacao da humidade do solo
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(solo_humidity < prefs.soloHumidityMin){
        await this.sendMail(mail,"A humidade do solo inserida foi de " + solo_humidity + "%, que é inferior ao valor limite de " + prefs.soloHumidityMin + "%");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do solo inserida foi de " + solo_humidity + "%, que é inferior ao valor limite de " + prefs.soloHumidityMin + "%", 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(solo_humidity > prefs.soloHumidityMax){
        await this.sendMail(mail, "A humidade do solo inserida foi de " + solo_humidity + "%, que é superior ao valor limite de " + prefs.soloHumidityMax + "%");
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A humidade do solo inserida foi de " + solo_humidity + "%, que é superior ao valor limite de " + prefs.soloHumidityMax + "%", 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }    
}
exports.verWet = async(prefs, mail, isWet, module_id) =>{
    //verificacao de folha molhada
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(isWet < prefs.isWetMin){
        await this.sendMail(mail,"O valor do sensor de folha molhada foi de " + isWet + ", que é inferior ao valor limite de " + prefs.isWetMin);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "O valor do sensor de folha molhada foi de " + isWet + ", que é inferior ao valor limite de " + prefs.isWetMin, 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(isWet > prefs.isWetMax){
        await this.sendMail(mail, "O valor do sensor de folha molhada foi de " + isWet + ", que é superior ao valor limite de " + prefs.isWetMax);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "O valor do sensor de folha molhada foi de " + isWet + ", que é superior ao valor limite de " + prefs.isWetMax, 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    } 
}
exports.verPluv = async(prefs, mail, pluviosidade, module_id) =>{
    //verificacao da pluviosidade
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(pluviosidade < prefs.pluviosidadeMin){
        await this.sendMail(mail,"A pluviosidade foi de " + pluviosidade + ", que é inferior ao valor limite de " + prefs.pluviosidadeMin);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A pluviosidade foi de " + pluviosidade + ", que é inferior ao valor limite de " + prefs.pluviosidadeMin, 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(pluviosidade > prefs.pluviosidadeMax){
        await this.sendMail(mail, "A pluviosidade foi de " + pluviosidade + ", que é superior ao valor limite de " + prefs.pluviosidadeMax);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A pluviosidade foi de " + pluviosidade + ", que é superior ao valor limite de " + prefs.pluviosidadeMax, 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    } 
}
exports.verVelVento = async(prefs, mail, vel_vento, module_id) =>{
    //verificacao da velocidade do vento
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(vel_vento < prefs.velVentoMin){
        await this.sendMail(mail, "A velocidade do vento foi de " + vel_vento + ", que é inferior ao valor limite de " + prefs.velVentoMin);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A velocidade do vento foi de " + vel_vento + ", que é inferior ao valor limite de " + prefs.velVentoMin, 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(vel_vento > prefs.velVentoMax){
        await this.sendMail(mail, "A velocidade do vento foi de " + vel_vento + ", que é superior ao valor limite de " + prefs.velVentoMax);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A velocidade do vento foi de " + vel_vento + ", que é superior ao valor limite de " + prefs.velVentoMax, 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verDirVento = async(prefs, mail, dir_vento, module_id) =>{
    //verificacao da direcao do vento
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(dir_vento < prefs.dirVentoMin){
        await this.sendMail(mail,"A direção do vento foi de " + dir_vento + ", que é inferior ao valor limite de " + prefs.dirVentoMin);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A direção do vento foi de " + dir_vento + ", que é inferior ao valor limite de " + prefs.dirVentoMin, 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(dir_vento > prefs.dirVentoMax){
        await this.sendMail(mail, "A direção do vento foi de " + dir_vento + ", que é superior ao valor limite de " + prefs.dirVentoMax);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A direção do vento foi de " + dir_vento + ", que é superior ao valor limite de " + prefs.dirVentoMax, 2, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
exports.verRadiacao = async(prefs, mail, radiacao, module_id) =>{
    //verificacao da direcao do vento
    let nome = await this.GetNomeVinha(module_id);
    let hora = await this.GetHora();
    let today = await etp.getFormatedDate(new Date());
    if(radiacao < prefs.radiacaoMin){
        await this.sendMail(mail,"A radiação foi de " + radiacao + ", que é inferior ao valor limite de " + prefs.radiacaoMin);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia-) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A radiação foi de " + radiacao + ", que é inferior ao valor limite de " + prefs.radiacaoMin, 3, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
    if(radiacao > prefs.radiacaoMax){
        await this.sendMail(mail,"A radiação foi de " + radiacao + ", que é superior ao valor limite de " + prefs.radiacaoMax);
        return new Promise((resolve,reject)=>{
            const id = uuid();
            db.query(`insert into avisos(id, nomeVinha, module_id, msgErro, prioridade, hora, dia) VALUES(?,?,?,?,?,?,?)`,
            [id, nome, module_id, "A radiação foi de " + radiacao + ", que é superior ao valor limite de " + prefs.radiacaoMax, 1, hora, today],
            err=>{
                if(err) reject (err);
                resolve({inserted:1, data_id: id});
            });
        });
    }
}
const calc = require('./ETP.js');
const { format } = require('mysql');
const db = require('../configs/teste.js');

exports.getHum = async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    return new Promise((resolve,reject)=>{
        db.query(`select date, air_humidity from data where date BETWEEN ? and ? and module_id =? order by date asc`,[dayInic, df, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.PInfeccao = async (dayInic, dayFim, module_id) =>{
    let send = [];
    let flagIntervalo = false;
    let inic;
    let inichum;
    let humValues = await this.getHum(dayInic, dayFim, module_id);
    /*let humValues = [{ date: '2009-06-29 11:08:59', air_humidity: 20 },
    { date: '2009-06-29 11:08:59', air_humidity: 20 },
    { date: '2009-06-29 12:08:59', air_humidity: 30 },
    { date: '2009-06-29 13:08:59', air_humidity: 92 },
    { date: '2009-06-29 14:08:59', air_humidity: 93 },
    { date: '2009-06-29 15:08:59', air_humidity: 20 },
    { date: '2009-06-29 16:08:59', air_humidity: 90 },
    { date: '2009-06-29 17:08:59', air_humidity: 91 },
    { date: '2009-06-29 18:08:59', air_humidity: 20 },
    { date: '2009-06-29 19:08:59', air_humidity: 20 },
    { date: '2009-06-29 20:08:59', air_humidity: 20 },
    { date: '2009-06-29 21:08:59', air_humidity: 90 },
    { date: '2009-06-29 22:08:59', air_humidity: 91 }
    ];*/
    

    if(humValues.length >0){
        
        if(humValues[0].air_humidity >= 90){
            inic = humValues[0].date;
            inichum = humValues[0].air_humidity
            flagIntervalo = true;
        }

        for(i=1; i< humValues.length; i++){

            if(humValues[i].air_humidity >= 90 && !flagIntervalo){
                inic = humValues[i].date;
                inichum = humValues[i].air_humidity
                flagIntervalo = true;
            }
            else{
                if(humValues[i].air_humidity< 90 && flagIntervalo){
                    send.push({inic:inic , fim:humValues[i-1].date,inichum: inichum, fimhum: humValues[i-1].air_humidity});
                    flagIntervalo = false;
                }
            }
            if(flagIntervalo && (i + 1) == humValues.length){
                send.push({inic:inic , fim:humValues[i].date,inichum: inichum, fimhum: humValues[i].air_humidity});
                    flagIntervalo = false;
            }
        }

    }else{


    }


    return send
}

exports.PHumidade = async (dayInic, dayFim, module_id, corte) =>{
    let send = [];
    let flagIntervalo = false;
    let inic;
    let inichum;
    let humValues = await this.getHum(dayInic, dayFim, module_id);
    if(humValues.length >0){
        
        if(humValues[0].air_humidity >= corte){
            inic = humValues[0].date;
            inichum = humValues[0].air_humidity
            flagIntervalo = true;
        }

        for(i=1; i< humValues.length; i++){

            if(humValues[i].air_humidity >= corte && !flagIntervalo){
                inic = humValues[i].date;
                inichum = humValues[i].air_humidity
                flagIntervalo = true;
            }
            else{
                if(humValues[i].air_humidity< corte && flagIntervalo){
                    send.push({inic:inic , fim:humValues[i-1].date,inichum: inichum, fimhum: humValues[i-1].air_humidity});
                    flagIntervalo = false;
                }
            }
            if(flagIntervalo && (i + 1) == humValues.length){
                    send.push({inic:inic , fim:humValues[i].date,inichum: inichum, fimhum: humValues[i].air_humidity});
                    flagIntervalo = false;
            }
        }

    }else{


    }
    return send
}

exports.Phumectacao = async (dayInic, dayFim, module_id,) => {
    let send = [];
    let flagIntervalo = false;
    let inic;
    let isWetValues = await this.getHum(dayInic, dayFim, module_id);
    
    if(isWetValues.length >0){
        
        if(isWetValues[0].isWet != 6999){
            inic = isWetValues[0].date;
            flagIntervalo = true;
        }

        for(i=1; i< isWetValues.length; i++){

            if(isWetValues[i].isWet != 6999 && !flagIntervalo){
                inic = isWetValues[i].date;
                flagIntervalo = true;
            }
            else{
                if(isWetValues[i].isWet == 6999 && flagIntervalo){
                    send.push({inic: inic , fim: isWetValues[i-1].date});
                    flagIntervalo = false;
                }
            }
            if(flagIntervalo && (i + 1) == isWetValues.length){
                    send.push({inic: inic , fim: isWetValues[i].date});
                    flagIntervalo = false;
            }
        }

    }else{


    }
    return send
}


exports.InfeccSend= async (body) => {
    let send = await this.PInfeccao(body.dataInic, body.dataFim, body.module_id);
    return new Promise((resolve,reject)=>{
        resolve(send);
    });
}

exports.HumSend= async (body) => {
    let send = await this.PHumidade(body.dataInic, body.dataFim, body.module_id, body.corte);
    return new Promise((resolve,reject)=>{
        resolve(send);
    });
}

exports.HumectacaoSend= async (body) => {
    let send = await this.Phumectacao(body.dataInic, body.dataFim, body.module_id);
    return new Promise((resolve,reject)=>{
        resolve(send);
    });
}
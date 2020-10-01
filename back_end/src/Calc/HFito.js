const db = require('../configs/teste.js');
const calc = require('./HFrio.js');
const { format } = require('mysql');

exports.Fito = async (dayInic, dayFim, module_id) =>{
    let medHours = await calc.averageTemp(dayInic,dayFim, module_id);
    let send = [];

    for(i =0; i<medHours.length; i++){
        if(medHours[i].avg > 10){
            send.push(medHours[i]);
        }else{
            send.push({date: medHours[i].date, avg: null})
        }
    }
    return send;
}

exports.FitoSend = async (body) => {
    let send = await this.Fito(body.dataInic, body.dataFim, body.module_id);
    return new Promise((resolve,reject)=>{
        resolve(send);
    });
}


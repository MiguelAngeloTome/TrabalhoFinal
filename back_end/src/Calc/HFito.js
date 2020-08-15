const db = require('../configs/mysql.js');
const calc = require('./HFrio.js');
const { format } = require('mysql');

exports.Fito = async (dayInic, dayFim, module_id) =>{
    let medHours = await calc.averageTemp(dayInic,dayFim, module_id);
    let send = [];

    for(i =0; i<medHours.length; i++){
        if(medHours[i].avg > 10){
            send.push(medHours[i]);
        }
    }
    return send;
}


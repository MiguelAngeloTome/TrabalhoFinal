const db = require('../configs/mysql.js');
const calc = require('./ETP.js');
const { format } = require('mysql');

exports.getHum = async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    console.log(df);
    return new Promise((resolve,reject)=>{
        db.all(`select date, air_humidity from data where date BETWEEN ? and ? and module_id =? order by date asc`,[dayInic, df, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.PInfeccao = async (dayInic, dayFim, module_id) =>{
    let send = [];
    let flagIntervalo = false;
    let inic;
    let humValues = await this.getHum(dayInic, dayFim, module_id);
    /*let humValues = [{ date: '2009-06-29 11:08:59', air_humidity: 20 },
    { date: '2009-06-29 11:08:59', air_humidity: 90 },
    { date: '2009-06-29 12:08:59', air_humidity: 91 },
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
    ];
    */

    if(humValues.length >0){
        
        if(humValues[0].air_humidity >= 90){
            inic = humValues[0].date;
            flagIntervalo = true;
        }

        for(i=1; i< humValues.length; i++){

            if(humValues[i].air_humidity >= 90 && !flagIntervalo){
                inic = humValues[i].date;
                console.log(inic)
                flagIntervalo = true;
            }
            else{
                if(humValues[i].air_humidity< 90 && flagIntervalo){
                    send.push(inic , humValues[i-1].date);
                    console.log(send);
                    flagIntervalo = false;
                }
            }
            if(flagIntervalo && (i + 1) == humValues.length){
                    send.push(inic , humValues[i].date);
                    console.log(send);
                    flagIntervalo = false;
            }
        }

    }else{


    }


    console.log(humValues.length)
    return send
}
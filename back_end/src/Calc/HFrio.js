
const calc = require('./ETP.js');
const { format } = require('mysql');

const db = require('../configs/teste.js');

exports.getTemp= async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    return new Promise((resolve,reject)=>{
        db.query(`select date, temp from data where date BETWEEN ? and ? and module_id =? order by date asc`,[dayInic, df, module_id],(err,row)=>{
            if(err) reject (err);
            if (row.length > 0){
                console.log(row);
                resolve(row);
            }
            resolve(null);
        });
    });
};

exports.averageTemp = async(dayInic, dayFim, module_id) =>{

    let tempValues = await this.getTemp(dayInic, dayFim, module_id);
    console.log(tempValues)
    if(tempValues === null) return null;
   /* let tempValues = [{ date: '2009-06-29 11:08:59', temp: 20 },
    { date: '2009-06-29 11:23:59', temp: 90 },
    { date: '2009-06-29 11:40:59', temp: 91 },
    { date: '2009-06-29 12:08:59', temp: 92 },
    { date: '2009-06-29 12:23:59', temp: 93 },
    { date: '2009-06-29 12:40:59', temp: 20 },
    { date: '2009-06-29 13:08:59', temp: 6 },
    { date: '2009-06-29 13:23:59', temp: -7 },
    { date: '2009-06-29 13:40:59', temp: 2 },
    { date: '2009-06-29 19:08:59', temp: 20 },
    { date: '2009-06-29 20:08:59', temp: 20 },
    { date: '2009-06-29 21:08:59', temp: 7},
    { date: '2009-06-29 21:22:59', temp: 10 }
    ];*/
    let average = [];
    let send = [];
    let aux = [];
    let hour1 ;
    let avg;
    hour = parseInt(tempValues[0].date.getHours());

    average.push(tempValues[0].temp);

    for(i=1; i< tempValues.length; i++){
        hour1 = parseInt(tempValues[i].date.getHours());

        if(hour == hour1 && i<tempValues.length-1){
            average.push(tempValues[i].temp);

        }else{
            if(hour != hour1){
                avg = await this.ave(average); //aqui
                average.length =0;
                average.push(tempValues[i].temp);
                hour = hour1;
                send.push({date: tempValues[i-1].date.getFullYear() +"-"+ (tempValues[i-1].date.getMonth()+1)+"-"+tempValues[i-1].date.getDate() +" "+tempValues[i-1].date.getHours() + ":00:00",avg: avg});

                if(i==tempValues.length-1){
                    avg = await this.ave(average);
                    send.push({date: tempValues[i].date.getFullYear() +"-"+ (tempValues[i].date.getMonth()+1)+"-"+tempValues[i].date.getDate() +" "+tempValues[i].date.getHours() + ":00:00",avg: avg});
                }

            }else{
                if(i==tempValues.length-1){
                    average.push(tempValues[i].temp);
                    avg = await this.ave(average);
                    send.push({date: tempValues[i].date.getFullYear() +"-"+ (tempValues[i].date.getMonth()+1)+"-"+tempValues[i].date.getDate() +" "+tempValues[i].date.getHours() + ":00:00",avg: avg});
                }
            }
        }
    }

    return send;
}

exports.HFrio = async(dayInic, dayFim, module_id, max, min, critico) =>{
    let average = await this.averageTemp(dayInic, dayFim,module_id);
    let send = [];
    if(average === null) return send;

    
    let day1 ;
    let hFrio = 0;
    day = parseInt(average[0].date.substring(8,10));
    
    if(average[0].avg < critico && average[0].avg > min){
        hFrio++;
    }
    if(average[0].avg > max){
        hFrio--;
    }
    for(i=1; i< average.length; i++){
        day1 = parseInt(average[i].date.substring(8,10));
        if(day == day1 && i<average.length-1){

            if(average[i].avg < critico && average[i].avg > min){
                hFrio++;
            }
            if(average[i].avg > max){
                hFrio--;
            }

        }else{
            if(day != day1){
                send.push({date: average[i-1].date.substring(0,10), horas: hFrio})
                hFrio = 0;
                day = day1;
                if(average[i].avg < critico && average[i].avg > min){
                    hFrio++;
                }
                if(average[i].avg > max){
                    hFrio--;
                }

                if(i==average.length-1){
                    send.push({date: average[i-1].date.substring(0,10), horas: hFrio})
                }
            }else{
                if(i==average.length-1){
                    if(average[i].avg < critico && average[i].avg > min){
                        hFrio++;
                    }
                    if(average[i].avg > max){
                        hFrio--;
                    }
                    send.push({date: average[i-1].date.substring(0,10), horas: hFrio})
                }
            }

    }
   

}
 return send;
}
exports.ave = async (values) =>{
   let average = 0;
   
   values.forEach(e => {
       average += e;
   });
   return Math.round((average / values.length), 3);
}

exports.AverageSend= async (body) => {
    let send = await this.HFrio(body.dataInic, body.dataFim, body.module_id, body.max, body.min, body.critico);
    return new Promise((resolve,reject)=>{
        resolve(send);
    });
}
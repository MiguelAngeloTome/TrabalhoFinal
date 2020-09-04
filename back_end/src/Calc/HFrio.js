const db = require('../configs/mysql.js');
const calc = require('./ETP.js');
const { format } = require('mysql');


exports.getTemp= async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    console.log(df);
    return new Promise((resolve,reject)=>{
        db.all(`select date, temp from data where date BETWEEN ? and ? and module_id =? order by date asc`,[dayInic, df, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.averageTemp = async(dayInic, dayFim, module_id) =>{

   // let tempValues = await this.getTemp(dayInic, dayFim, module_id);
    let tempValues = [{ date: '2009-06-29 11:08:59', temp: 20 },
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
    ];
    let average = [];
    let send = [];
    let aux = [];
    let hour1 ;
    let avg;
    hour = parseInt(tempValues[0].date.substring(11,13));

    average.push(tempValues[0].temp);

    for(i=1; i< tempValues.length; i++){
        hour1 = parseInt(tempValues[i].date.substring(11,13));

        if(hour == hour1 && i<tempValues.length-1){
            average.push(tempValues[i].temp);

        }else{
            if(hour != hour1){
                avg = await this.ave(average); //aqui
                average.length =0;
                average.push(tempValues[i].temp);
                hour = hour1;
                send.push({date: tempValues[i-1].date.substring(0,13) + ":00:00",avg: avg});

                if(i==tempValues.length-1){
                    avg = await this.ave(average);
                    send.push({date: tempValues[i].date.substring(0,13) + ":00:00",avg: avg});
                }

            }else{
                if(i==tempValues.length-1){
                    average.push(tempValues[i].temp);
                    avg = await this.ave(average);
                    send.push({date: tempValues[i].date.substring(0,13) + ":00:00",avg: avg});
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
    let send = await this.averageTemp(body.dataInic, body.dataFim, body.module_id);
    return new Promise((resolve,reject)=>{
        resolve(send);
    });
}
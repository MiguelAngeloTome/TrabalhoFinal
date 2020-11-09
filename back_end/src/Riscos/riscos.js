const { format } = require('mysql');
const db = require('../configs/teste.js');
const calc = require('../Calc/ETP');

exports.getVent = async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    return new Promise((resolve,reject)=>{
        db.query(`select date, vel_vento from data where date BETWEEN ? and ? and module_id =? order by date asc`,[dayInic, df, module_id],(err,row)=>{
            if(err) reject (err);
            if (row.length > 0){
                resolve(row);
            }
            resolve(null);
        });
    });
};

exports.getHum = async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    return new Promise((resolve,reject)=>{
        db.query(`select date, air_humidity from data where date BETWEEN ? and ? and module_id =? order by date asc`,[dayInic, df, module_id],(err,row)=>{
            if(err) reject (err);
            if (row.length > 0){
                resolve(row);
            }
            resolve(null);
        });
    });
};

exports.getTemp = async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    return new Promise((resolve,reject)=>{
        db.query(`select date, temp from data where date BETWEEN ? and ? and module_id =? order by date asc`,[dayInic, df, module_id],(err,row)=>{
            if(err) reject (err);
            if (row.length > 0){
                resolve(row);
            }
            resolve(null);
        });
    });
};


exports.getPrece = async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    return new Promise((resolve,reject)=>{
        db.query(`select date, pluviosidade from data where date BETWEEN ? and ? and module_id =? order by date asc`,[dayInic, df, module_id],(err,row)=>{
            if(err) reject (err);
            if (row.length > 0){
                resolve(row);
            }
            resolve(null);
        });
    });
};

//Risco de Rajada


exports.RRajada = async (dayInic, dayFim, module_id, corte) =>{
    let send = [];
    let flagIntervalo = false;
    let inic;
    let fim;
    let maxVel;
    let ventValues = await this.getVent(dayInic, dayFim, module_id);
    /*let ventValues = [{ date: '2009-06-29 11:08:59', vel_vento: 20 },
    { date: '2009-06-29 11:23:59', vel_vento: 90 },
    { date: '2009-06-29 11:40:59', vel_vento: 91 },
    { date: '2009-06-29 12:08:59', vel_vento: 65 },
    { date: '2009-06-29 12:23:59', vel_vento: 93 },
    { date: '2009-06-29 12:40:59', vel_vento: 20 },
    { date: '2009-06-29 13:08:59', vel_vento: 6 },
    { date: '2009-06-29 13:23:59', vel_vento: -7 },
    { date: '2009-06-29 13:40:59', vel_vento: 2 },
    { date: '2009-06-29 19:08:59', vel_vento: 60 },
    { date: '2009-06-29 20:08:59', vel_vento: 20 },
    { date: '2009-06-29 21:08:59', vel_vento: 7},
    { date: '2009-06-29 21:22:59', vel_vento: 10 }
    ]*/
    if(ventValues === null) return null;
    if(ventValues.length >0){
        
        if(ventValues[0].vel_vento >= corte){
            inic = ventValues[0].date.getFullYear() + "-" + (ventValues[0].date.getMonth() + 1) + "-" + ventValues[0].date.getDate() + " " + ventValues[0].date.getHours() + ":" + ventValues[0].date.getMinutes() + ":" + ventValues[0].date.getSeconds();
            maxVel = ventValues[0].vel_vento
            flagIntervalo = true;
        }

        for(i=1; i< ventValues.length; i++){

            if(ventValues[i].vel_vento >= corte && !flagIntervalo){
                inic = ventValues[i].date.getFullYear() + "-" + (ventValues[i].date.getMonth() + 1) + "-" + ventValues[i].date.getDate() + " " + ventValues[i].date.getHours() + ":" + ventValues[i].date.getMinutes() + ":" + ventValues[i].date.getSeconds()
                maxVel = ventValues[i].vel_vento
                flagIntervalo = true;
            }
            else{
                if(ventValues[i].vel_vento< corte && flagIntervalo){
                    fim = ventValues[i-1].date.getFullYear() + "-" + (ventValues[i-1].date.getMonth() + 1) + "-" + ventValues[i-1].date.getDate() + " " + ventValues[i-1].date.getHours() + ":" + ventValues[i-1].date.getMinutes() + ":" + ventValues[i-1].date.getSeconds()
                    send.push({inic:inic , fim:fim,max: maxVel});
                    flagIntervalo = false;
                }else{
                    if(ventValues[i].vel_vento> maxVel){
                        maxVel = ventValues[i].vel_vento;
                    }
                }
            }
            if(flagIntervalo && (i + 1) == ventValues.length){
                if(ventValues[i].vel_vento> maxVel){
                    maxVel = ventValues[i].vel_vento;
                }
                    fim = ventValues[i].date.getFullYear() + "-" + (ventValues[i].date.getMonth() + 1) + "-" + ventValues[i].date.getDate() + " " + ventValues[i].date.getHours() + ":" + ventValues[i].date.getMinutes() + ":" + ventValues[i].date.getSeconds()
                    send.push({inic:inic , fim:fim,max: maxVel});
                    flagIntervalo = false;
            }
        }

    }else{


    }
    return send
}


exports.RajadaSend= async (body) => {
    let send = await this.RRajada(body.dataInic, body.dataFim, body.module_id, body.corte);
    return new Promise((resolve,reject)=>{
        if(send!=null){
            resolve(send);
        }else{
            reject("empty")
        }
    });
}


// Risco de incendio



exports.RIncendio = async (module, data) => {
    let Tmax = await calc.getMaxTemp(data, module);
    let RHMin = await calc.getHumMin(data, module);

   //let Tmax = 30;
   //let RHMin = 20;
    if(Tmax == null || RHMin == null){
        return null;
    }
    var rounded = Math.round(Tmax/RHMin * 10) / 10
    return rounded
}




exports.RIncendioOverDays= async (dataInicio, dataFim, module) => {
    let data = new Date(dataInicio);
    let DataF = new Date(dataFim);
    let send = [];
    let d;
    for(data; data<=DataF;data.setDate(data.getDate()+1)){
        d = await calc.getFormatedDate(data);
        risco = await this.RIncendio(module, d);
        if(risco != null){
            send.push({date: d,value:risco});
        }
        
    }
    return send;
}



exports.RIncendioOverTime= async (body) => {
    let send = await this.RIncendioOverDays(body.dataInic, body.dataFim, body.module_id);
    return new Promise((resolve,reject)=>{
        resolve(send);
    });
}



//risco de geada

exports.RGeada = async (dayInic, dayFim, module_id) =>{
    let send = [];
    let flagIntervalo = false;
    let inic;
    let fim;
    let maxVel;
    let tempValues = await this.getTemp(dayInic, dayFim, module_id);
    let humValues = await this.getHum(dayInic,dayFim,module_id)
    
    /*let tempValues =[{ date: '2009-06-29 11:08:59', temp: 15 },
    { date: '2009-06-29 11:23:59', temp: 10 },
    { date: '2009-06-29 11:40:59', temp: 5 },
    { date: '2009-06-29 12:08:59', temp: -1 },
    { date: '2009-06-29 12:23:59', temp: 0 },
    { date: '2009-06-29 12:40:59', temp: -2 },
    { date: '2009-06-29 13:08:59', temp: -7 },
    { date: '2009-06-29 13:23:59', temp: -7 },
    { date: '2009-06-29 13:40:59', temp: 12 },
    { date: '2009-06-29 19:08:59', temp: 0 },
    { date: '2009-06-29 20:08:59', temp: 20 },
    { date: '2009-06-29 21:08:59', temp: 7},
    { date: '2009-06-29 21:22:59', temp: 16 }
    ]

    let humValues = [{ date: '2009-06-29 11:08:59', air_humidity: 20 },
    { date: '2009-06-29 11:23:59', air_humidity: 90 },
    { date: '2009-06-29 11:40:59', air_humidity: 60 },
    { date: '2009-06-29 12:08:59', air_humidity: 92 },
    { date: '2009-06-29 12:23:59', air_humidity: 93 },
    { date: '2009-06-29 12:40:59', air_humidity: 20 },
    { date: '2009-06-29 13:08:59', air_humidity: 6 },
    { date: '2009-06-29 13:23:59', air_humidity: -7 },
    { date: '2009-06-29 13:40:59', air_humidity: 10 },
    { date: '2009-06-29 19:08:59', air_humidity: 20 },
    { date: '2009-06-29 20:08:59', air_humidity: 20 },
    { date: '2009-06-29 21:08:59', air_humidity: 7},
    { date: '2009-06-29 21:22:59', air_humidity: 10 }
    ]*/

    if(tempValues === null ||humValues === null) return null;

    if(tempValues.length >0 && humValues.length >0){
        
        if(await this.PontoOrvalho(tempValues[0].temp,humValues[0].air_humidity)){
            inic = tempValues[0].date.getFullYear() + "-" + (tempValues[0].date.getMonth() + 1) + "-" + tempValues[0].date.getDate() + " " + tempValues[0].date.getHours() + ":" + tempValues[0].date.getMinutes() + ":" + tempValues[0].date.getSeconds();
            flagIntervalo = true;
        }

        for(i=1; i< tempValues.length; i++){

            if(await this.PontoOrvalho(tempValues[i].temp,humValues[i].air_humidity) && !flagIntervalo){
                inic = tempValues[i].date.getFullYear() + "-" + (tempValues[i].date.getMonth() + 1) + "-" + tempValues[i].date.getDate() + " " + tempValues[i].date.getHours() + ":" + tempValues[i].date.getMinutes() + ":" + tempValues[i].date.getSeconds();
                flagIntervalo = true;
            }
            else{
                if(await this.PontoOrvalho(tempValues[i].temp,humValues[i].air_humidity) == false && flagIntervalo){
                    fim = tempValues[i-1].date.getFullYear() + "-" + (tempValues[i-1].date.getMonth() + 1) + "-" + tempValues[i-1].date.getDate() + " " + tempValues[i-1].date.getHours() + ":" + tempValues[i-1].date.getMinutes() + ":" + tempValues[i-1].date.getSeconds()
                    send.push({inic:inic , fim:fim});
                    flagIntervalo = false;
                }
            }
            if(flagIntervalo && (i + 1) == tempValues.length){
                    fim = tempValues[i].date.getFullYear() + "-" + (tempValues[i].date.getMonth() + 1) + "-" + tempValues[i].date.getDate() + " " + tempValues[i].date.getHours() + ":" + tempValues[i].date.getMinutes() + ":" + tempValues[i].date.getSeconds();
                    send.push({inic:inic , fim:fim});
                    flagIntervalo = false;
            }
        }

    }else{


    }
    return send
}


exports.GeadaSend= async (body) => {
    let send = await this.RGeada(body.dataInic, body.dataFim, body.module_id);
    return new Promise((resolve,reject)=>{
        if(send!=null){
            resolve(send);
        }else{
            reject("empty")
        }
    });
}

exports.PontoOrvalho = async (temp, hum) => {
    if(temp <= 0){
        console.log("true")
        return true;
    }else{
        if(temp >= 5 && temp < 10 && hum > 0 && hum < 65){
            console.log("true")
            return true
        }else{
            if(temp >= 10 && temp < 15 && hum > 0 && hum < 50){
                console.log("true")
                return true;
            }
        }
    }
    console.log("false")
    return false;
}

//risco de enxurrada


exports.REnxurrada = async (dayInic, dayFim, module_id, corte) =>{
    let send = [];
    let preceValues = await this.averagePrece(dayInic, dayFim, module_id);
    if(preceValues === null) return null;
    if(preceValues.length >0){

        for(i=0; i< preceValues.length; i++){

            if(preceValues[i].avg >= corte){
                send.push({date:preceValues[i].date, avg: preceValues[i].avg});
            }
        }


    } 
    return send

}


exports.EnxurradaSend= async (body) => {
    let send = await this.REnxurrada(body.dataInic, body.dataFim, body.module_id, body.corte);
    return new Promise((resolve,reject)=>{
        if(send!=null){
            resolve(send);
        }else{
            reject("empty")
        }
    });
}


exports.averagePrece = async(dayInic, dayFim, module_id) =>{

    let preceValues = await this.getPrece(dayInic, dayFim, module_id);
    console.log(preceValues);
   /* let preceValues = [{ date: '2009-06-29 11:08:59', pluviosidade: 60 },
    { date: '2009-06-29 11:23:59', pluviosidade: 90 },
    { date: '2009-06-29 11:40:59', pluviosidade: 91 },
    { date: '2009-06-29 12:08:59', pluviosidade: 92 },
    { date: '2009-06-29 12:23:59', pluviosidade: 93 },
    { date: '2009-06-29 12:40:59', pluviosidade: 90 },
    { date: '2009-06-29 13:08:59', pluviosidade: 6 },
    { date: '2009-06-29 13:23:59', pluviosidade: 2 },
    { date: '2009-06-29 13:40:59', pluviosidade: 2 },
    { date: '2009-06-29 19:08:59', pluviosidade: 20 },
    { date: '2009-06-29 20:08:59', pluviosidade: 20 },
    { date: '2009-06-29 21:08:59', pluviosidade: 7},
    { date: '2009-06-29 21:22:59', pluviosidade: 10 }
    ];*/
    let average = [];
    let send = [];
    let aux = [];
    let hour1 ;
    let avg;
    if(preceValues === null) return null;
    hour = preceValues[0].date.getHours();
    console.log(hour);

    average.push(preceValues[0].pluviosidade);

    for(i=1; i< preceValues.length; i++){
        hour1 = parseInt(preceValues[i].date.getHours());

        if(hour == hour1 && i<preceValues.length-1){
            average.push(preceValues[i].pluviosidade);

        }else{
            if(hour != hour1){
                avg = await this.ave(average); //aqui
                average.length =0;
                average.push(preceValues[i].pluviosidade);
                hour = hour1;
                send.push({date: preceValues[i-1].date.getFullYear() +"-"+ (preceValues[i-1].date.getMonth()+1)+"-"+preceValues[i-1].date.getDate() +" "+preceValues[i-1].date.getHours() + ":00:00",avg: avg});

                if(i==preceValues.length-1){
                    avg = await this.ave(average);
                    send.push({date: preceValues[i].date.getFullYear() +"-"+ (preceValues[i].date.getMonth()+1)+"-"+preceValues[i].date.getDate() +" "+preceValues[i].date.getHours() + ":00:00",avg: avg});
                }

            }else{
                if(i==preceValues.length-1){
                    average.push(preceValues[i].pluviosidade);
                    avg = await this.ave(average);
                    send.push({date: preceValues[i].date.getFullYear() +"-"+ (preceValues[i].date.getMonth()+1)+"-"+preceValues[i].date.getDate() +" "+preceValues[i].date.getHours() + ":00:00",avg: avg});
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


/*
if(preceValues[0].avg >= corte){
            inic = preceValues[0].date;
            maxVel = preceValues[0].avg
            flagIntervalo = true;
        }

        for(i=1; i< preceValues.length; i++){

            if(preceValues[i].avg >= corte && !flagIntervalo){
                inic = preceValues[i].date;
                maxVel = preceValues[i].avg
                flagIntervalo = true;
            }
            else{
                if(preceValues[i].avg< corte && flagIntervalo){
                    send.push({inic:inic , fim:preceValues[i-1].date,max: maxVel});
                    flagIntervalo = false;
                }else{
                    if(preceValues[i].avg> maxVel){
                        maxVel = preceValues[i].avg;
                    }
                }
            }
            if(flagIntervalo && (i + 1) == preceValues.length){
                if(preceValues[i].avg> maxVel){
                    maxVel = preceValues[i].avg;
                }
                    send.push({inic:inic , fim:preceValues[i].date,max: maxVel});
                    flagIntervalo = false;
            }
        }

    }else{


    }*/
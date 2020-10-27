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

exports.getMaxTemp = async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    return new Promise((resolve,reject)=>{
        db.query(`select max(temp) as mtemp from data
                where date BETWEEN ? and ?
                and module_id = ?`,[dayInic, df, module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].mtemp);
                    }
                    resolve(null);
                });
            });
        };

exports.getMinTemp = async(dayInic, dayFim, module_id) =>{
    let df = new Date(dayFim);
    df.setDate(df.getDate()+1);
    df = await calc.getFormatedDate(df);
    return new Promise((resolve,reject)=>{
        db.query(`select min(temp) as mtemp from data
                where date BETWEEN ? and ?
                and module_id = ?`,[dayInic, df, module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].mtemp);
                    }
                    resolve(null);
                });
            });
        };

exports.cutoffValues= async (method, dayInic, dayFim, module_id, lower, upper)=>{
    let send = [];
    let temps = await this.getTemp(dayInic,dayFim,module_id);
    let max = await this.getMaxTemp(dayInic,dayFim,module_id);
    let min = await this.getMinTemp(dayInic,dayFim,module_id);
    //horizontal
    if(method == 0){
        if(min> upper){
            for(i = 0; i<temps.length();i++){
                send.push({date:temps[i].date, valor:upper})
            }
        }else if(max<lower){

        }else if(min>=lower && max<= upper){
            send = temps
        }else if(min<lower && max<= upper){
            for(i = 0; i<temps.length();i++){
                if(temps[i].temp >= lower){
                    send.push({date:temps[i].date, valor:temps[i].temp})
                }
                
            }
        }else if(min>= lower && max > upper){
            for(i = 0; i<temps.length();i++){
                if(temps[i].temp <= upper){
                    send.push({date:temps[i].date, valor:temps[i].temp})
                }else if(temps[i].temp > upper){
                    send.push({date:temps[i].date, valor:upper})
                }
                
            }
        }else if(min < lower && max > upper){
            for(i = 0; i<temps.length();i++){
                if(temps[i].temp >= lower && temps[i].temp <= upper){
                    send.push({date:temps[i].date, valor:temps[i].temp})
                }else if(temps[i].temp > upper){
                    send.push({date:temps[i].date, valor:upper})
                }
                
            }
        }
    }
    //vertical
    else if(method == 1){
        if(min >upper){

        }else if(max< lower){

        }else if(min>= lower && max<=upper){
            send = temps
        }else if(min < lower && max <= upper){
            for(i =0; i < temps.length();i++){
                if(temps[i].temp >= lower){
                    send.push({date:temps[i].date, valor:temps[i].temp})
                }
            }
        }else if(min >= lower && max > upper){
            for(i =0; i < temps.length();i++){
                if(temps[i].temp <= upper){
                    send.push({date:temps[i].date, valor:temps[i].temp})
                }
            }
        }else if(min <lower && max> upper){
            for(i =0; i < temps.length();i++){
                if(temps[i].temp <= upper && temps[i].temp >= lower){
                    send.push({date:temps[i].date, valor:temps[i].temp})
                }
            }
        }
    }
    //No cutoff
    else if(method == 2){
        if(min>upper){
            send = temps;
        }else if(max<lower){

        }else if(min >= lower && max<= upper){
            send=temps
        }else if(min < lower && max<= upper){
            for(i = 0; i<temps.length();i++){
                if(temps[i].temp >= lower){
                    send.push({date:temps[i].date, valor:temps[i].temp})
                }
            }
        }else if(min >= lower && max > upper){
            for(i = 0; i<temps.length();i++){
                if(temps[i].temp >= lower){
                    send.push({date:temps[i].date, valor:temps[i].temp})
                }
            }
        }else if(min<lower && max > upper){
            for(i = 0; i<temps.length();i++){
                if(temps[i].temp >= lower){
                    send.push({date:temps[i].date, valor:temps[i].temp})
                }
            }
        }
    }
    return send;
}

exports.areaGraph = async(temps, lower)=>{
    let result = 0;
    let index = 0;
    let aux = [];
    for(i=0;i<temps.length();i++){
        aux[index] = (temps[i].temp - lower)
        index ++ ; 
    }
    let h = (aux.length() - 0)/ (aux.length() - 1)
    let fa = aux[0];
    let fb = aux[aux.length()-1];
    let sum =0;
    for( i = 1; i<aux.length()-1;i++){
        sum += aux[i]
    }
    result = h* (((fb+fa)/2)+sum)
    result = result /(index-1)
    return Math.round(result,3);
}

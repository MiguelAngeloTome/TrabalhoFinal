const { format } = require('mysql');
const db = require('../configs/teste.js');

exports.getMedTemp = async(day, module_id) =>{
    console.log(day)
    return new Promise((resolve,reject)=>{
        db.query(`select avg(temp) as mtemp from data
                where date like ? '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        console.log(row)
                        resolve(row[0].mtemp);
                        
                    }
                    resolve(null);
                });
            });
        };

exports.getMaxTemp = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.query(`select max(temp) as mtemp from data
                where date like ? '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].mtemp);
                    }
                    resolve(null);
                });
            });
        };

exports.getMinTemp = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.query(`select min(temp) as mtemp from data
                where date like ? '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].mtemp);
                    }
                    resolve(null);
                });
            });
        };

exports.getRadMed = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.query(`select avg(radiacao) as mrad from data
                where date like ? '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].mrad);
                    }
                    resolve(null);
                });
            });
        };

exports.getHumMax = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.query(`select max(air_humidity) as mhum from data
                where date like ? '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].mhum);
                    }
                    resolve(null);
                });
            });
        };

exports.getHumMin = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.query(`select min(air_humidity) as mhum from data
                where date like ? '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].mhum);
                    }
                    resolve(null);
                });
            });
        };

exports.getVentoMed = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.query(`select avg(vel_vento) as mvento from data
                where date like ? '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].mvento);
                    }
                    resolve(null);
                });
            });
        };

exports.getLat = async(module_id) =>{
    return new Promise((resolve,reject)=>{
        db.query(`select lat from module
                where module_id like ?`,[module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].lat);
                    }
                    resolve(null);
                });
            });
        };

exports.getLng = async(module_id) =>{
    return new Promise((resolve,reject)=>{
        db.query(`select lng from module
                where module_id like ?`,[module_id],(err,row)=>{
                    if(err) reject (err);
                    if (row.length > 0){
                        resolve(row[0].lng);
                    }
                    resolve(null);
                });
            });
        };
//Funcoes 


exports.pressaoDadaTemperatura = async (temp) => {
    return Math.pow(0.611, (17.27 * temp) / (temp + 237.3));
}

exports.pressaoValorReal = async (etMax, etMin, RHMax, RHMin) => {
    return (0.5 * etMin * (RHMax / 100)) + (0.5 * etMax * (RHMin / 100));
}

exports.pressaoVaporSaturacao = async (EtMax, EtMin) => {
    return (EtMax + EtMin) / 2;
}


exports.VPD = async (Ea, Ed) => {
    return Ea - Ed;
}

exports.radiacaoExtraterrestre = async (latitude, data) => {
    let Ra = 0.0;
    let Ws = 0.0;
    let delta = 0.0;
    let Dr = 0.0;
    let diaAno = await this.diaToDiaAno(data);

    //Calculo de Dr
    Dr = 1 + 0.033 * (Math.cos((0.0172 * diaAno) * (Math.PI / 180)) * 180 / Math.PI);     
    //Calculo de delta
    delta = 0.409 * (Math.sin((0.0172 * diaAno - 1.39) * (Math.PI / 180)) * 180 / Math.PI);
    //Calculo de ws.
    Ws = (Math.acos(-Math.tan(latitude * (Math.PI / 180)) * Math.tan(delta * (Math.PI / 180))) * 180 / Math.PI);
    //Calculo da radia��o extraterrestre
    Ra = 37.6 * Dr * (Ws * (Math.sin(latitude * (Math.PI / 180)) * 180 / Math.PI)) * (Math.sin(delta * (Math.PI / 180)) * 180 / Math.PI) + (Math.cos(latitude * (Math.PI / 180)) * 180 / Math.PI) * (Math.cos(delta * (Math.PI / 180)) * 180 / Math.PI) * (Math.sin(Ws * (Math.PI / 180)) * 180 / Math.PI);
    return Ra;
}

exports.curvaPressao = async (Tmed) => {
    return (Math.pow(2405, ((17.27 * Tmed) / (Tmed + 237.3)))) / (Math.pow((Tmed + 237.3), 2));
}

exports.radiacaoLiquidaRns = async (radMed) => {
    return 0.77 * radMed
}

exports.radiacaoLiquidaRnl = async (radMed, latitude, Ed, Tmax, Tmin, altitude, data) => {

        let Rnl = 0.0;
        let Rso = 0.0;
        let diaAno = this.diaToDiaAno(data);
        let Stefan_Boltzmann = 4.90 * 10 * (Math.exp(-9));
        let TKx = Tmax + 273;
        let Tkn = Tmin + 273;
        let Ra = await this.radiacaoExtraterrestre(latitude, data);
        //C�lculo de Rso
        Rso = (0.75 + 0.00002 * altitude) * Ra;
        //C�lculo de Rnl
        Rnl = -1 * ((1.35 * (radMed / Rso) * (-0.35)) * (0.34 - 0.14 * Ed) * Stefan_Boltzmann * ((Math.pow(TKx, 4) + Math.pow(Tkn, 4)) / 2));
        return Rnl;

}

exports.radiacaoLiquidaRn = async (Rns, Rnl) => {
    return Rns + Rnl;
}

exports.constantePsicrometrica = async (altitude) => {
        let constante = 0.0;
        let P = 0.0;
        let lambda = 2.45;
        P = 101.3 * ((293 - 0.0065 * altitude) / 293);
        constante = (0.00163 * (P / lambda));
        return constante;
}

exports.evapotranspiracaoPotencial = async (Tmed, radMed, latitude, RHmax, RHmin, Tmax, Tmin, altitude, U2, data) => {
        let etp = 0.0;
        //Defini��o do dia do ano
        let diaAno = data;
        //Press�o de vapor para a temperatura m�xima
        let etMax = await this.pressaoDadaTemperatura(Tmax);
        //Press�o de vapor para a temperatura min�ma
        let etMin = await this.pressaoDadaTemperatura(Tmin);
        //Defini��o de press�o de vapor real (Ed)
        let Ed = await this.pressaoValorReal(etMax, etMin, RHmax, RHmin);
        //Defini��o de press�o de vapor real (Ea)
        let Ea = await this.pressaoVaporSaturacao(etMax, etMin);
        //Defini��o do d�fice de press�o de vapor 
        let VPD = await this.VPD(Ea, Ed);
        //Defini��o da radia��o extraterrestre
        let Ra = await this.radiacaoExtraterrestre(latitude, data);
        //Defini��o do declive da curva de press�o de vapor
        let decCurvaPressaoVapor = await this.curvaPressao(Tmed);
        //Defini��o da radia��o l�quida  
        let Rns = await this.radiacaoLiquidaRns(radMed);
        let Rnl = await this.radiacaoLiquidaRnl(radMed, latitude, Ed, Tmax, Tmin, altitude, data);
        let radiacaoLiquidaRn =await this.radiacaoLiquidaRn(Rns, Rnl);
        //Defini��o da constante psicom�trica
        let constPsicometrica = await this.constantePsicrometrica(altitude);
        //C�lculo do valor de evapotranspira��o potencial
        etp = Math.round(((0.408 * decCurvaPressaoVapor * radiacaoLiquidaRn) + (altitude * (900 / (Tmed + 273)) * U2 * VPD)) / (decCurvaPressaoVapor + altitude * (1 + 0.34 * U2)), 1);
        return etp;
}

exports.ETPxCoeficiente = async (coeficiente, etp) => {
    return etp * coeficiente;
}


exports.ETPvalues = async (module, data) => {
    let Tmed = await this.getMedTemp(data, module);
    let radMed = await this.getRadMed(data, module);
    let latitude = await this.getLat(module);
    let RHMax = await this.getHumMax(data, module);
    let RHMin = await this.getHumMin(data, module);
    let Tmax = await this.getMaxTemp(data, module);
    let Tmin = await this.getMinTemp(data, module);
    let altitude = 0;
    let U2 = await this.getVentoMed(data, module);
    if(Tmed == null || radMed == null ||latitude == null || RHMax == null || RHMin == null || Tmax == null || Tmin == null || altitude == null ||U2 == null ){
       return null; 
    }
    etp = await this.evapotranspiracaoPotencial(Tmed, radMed, latitude, RHMax, RHMin, Tmax, Tmin, altitude, U2, data);

    return etp;
}

exports.ETPOverDays= async (dataInicio, dataFim, module) => {
    let data = new Date(dataInicio);
    let DataF = new Date(dataFim);
    let send = [];
    let d;
    for(data; data<=DataF;data.setDate(data.getDate()+1)){
        d = await this.getFormatedDate(data);
        etp = await this.ETPvalues(module, d);
        
        if(etp != null){
            etp = await this.ETPxCoeficiente(0.7,etp)
            send.push({date: d,value:etp});
        }
        
    }
    return send;
}

exports.ETPOverTime= async (body) => {
    let send = await this.ETPOverDays(body.dataInic, body.dataFim, body.module_id);
    return new Promise((resolve,reject)=>{
        resolve(send);
    });
}


exports.getFormatedDate = async(data) => {
    let date = new Date(data);
    let month = format(date.getMonth()+1);
    if(month<10){
        month = "0" + month;
    }
    let day = format(date.getDate());
    if(day<10){
        day = "0" + day;
    }
    let year = format(date.getFullYear());
    return year + "-" + month + "-" + day;


}

exports.diaToDiaAno = async (data) => {
    let m = data.substring(5,7);
    let d = data.substring(8,10);
    m = parseInt(m);
    d = parseInt(d)

    md = (m-1) * 30.436875;

    dy = md + d;
    return Math.floor(dy);
}
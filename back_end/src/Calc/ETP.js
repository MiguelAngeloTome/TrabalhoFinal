const db = require('../configs/mysql.js');

exports.getMedTemp = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select avg(temp) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getMaxTemp = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select max(temp) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getMinTemp = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select min(temp) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getRadMed = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select avg(radiacao) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getHumMax = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select max(air_humidity) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getHumMin = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select min(air_humidity) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getVentoMed = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select avg(vel_vento) from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getLat = async(module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select lat from module
                where module_id like ?`,[module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
};

exports.getLng = async(module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select lng from module
                where module_id like ?`,[module_id],(err,row)=>{
            if(err) reject (err);
            resolve(row);
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
        let Ra = this.radiacaoExtraterrestre(latitude, data);
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
        let etMax = pressaoDadaTemperatura(Tmax);
        //Press�o de vapor para a temperatura min�ma
        let etMin = pressaoDadaTemperatura(Tmin);
        //Defini��o de press�o de vapor real (Ed)
        let Ed = pressaoVaporReal(etMax, etMin, RHmax, RHmin);
        //Defini��o de press�o de vapor real (Ea)
        let Ea = pressaoVaporSaturacao(etMax, etMin);
        //Defini��o do d�fice de press�o de vapor 
        let VPD = VPD(Ea, Ed);
        //Defini��o da radia��o extraterrestre
        let Ra = radiacaoExtraterrestre(latitude, data);
        //Defini��o do declive da curva de press�o de vapor
        let decCurvaPressaoVapor = curvaPressao(Tmed);
        //Defini��o da radia��o l�quida 
        let radiacaoLiquidaRn = radiacaoLiquidaRn(radiacaoLiquidaRns(radMed), radiacaoLiquidaRnl(radMed, latitude, Ed, Tmax, Tmin, altitude, data));
        //Defini��o da constante psicom�trica
        let constPsicometrica = this.constantePsicrometrica(altitude);
        //C�lculo do valor de evapotranspira��o potencial
        etp = Math.Round(((0.408 * decCurvaPressaoVapor * radiacaoLiquidaRn) + (altitude * (900 / (Tmed + 273)) * U2 * VPD)) / (decCurvaPressaoVapor + altitude * (1 + 0.34 * U2)), 1);
        return etp;
}

exports.ETPxCoeficiente = async (coeficiente, etp) => {
    return etp * coeficiente;
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
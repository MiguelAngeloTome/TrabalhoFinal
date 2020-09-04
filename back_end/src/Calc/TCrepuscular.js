const db = require('../configs/mysql.js');
const calc = require('./ETP.js');
const { format } = require('mysql');

exports.horasNascerPor = async (sol, latitude, longitude, Num_dia) =>{
    
        //Variável que só tem 4 valores possíveis 90, 96, 102 e 108. No nosso caso irá ser 90 pois será 
        //o "offical" e as outras dizem respeito a "civil", "nautical" e "astronomical".
        let zenith = 90;
        //Próxima var é a constante que permite converter Radianos para Graus (bastanto apenas multiplicar)
        let SenCosTan = Math.PI / 180;
        let ASenACosATan = 180 / Math.PI;
        //N será o número do dia do ano em que estamos

        let N= Num_dia;

        //-----------------------
        //Calcular conforme é para o sol a pôr ou a nascer

        let lngHour = longitude / 15;
        let t = 0;
        //Se true então é o sol a nascer
        if (sol == true)
        {
            t = N + ((6 - lngHour) / 24);
        }
        //Se false então é o sol a pôr
        if (sol == false)
        {
            t = N + ((18 - lngHour) / 24);
        }
        //--------------------------
        //Calcula a "mean anomaly" do sol
        let M = (0.9856 * t) - 3.289;
        //--------------------------
        //Calcula a longitude real ao Sol
        let L = M + (1.916 * Math.sin(M * SenCosTan)) + (0.020 * Math.sin(2 * M * SenCosTan)) + 282.634;
        //Consoante o valor de L, este tem de ser ajustado entre 0 e 360 adicionando ou subtraindo por 360
        if (L < 0)
        {
            L = L + 360;
        }
        if (L > 360)
        {
            L = L - 360;
        }
        //--------------------------
        //Calcula a correcta ascensão do sol
        let RA = Math.atan(0.91764 * Math.tan(L * SenCosTan)) * ASenACosATan;
        //Consoante o valor de RA, este tem de ser ajustado entre 0 e 360 adicionando ou subtraindo por 360
        if (RA < 0)
        {
            RA = RA + 360;
        }
        if (RA > 360)
        {
            RA = RA - 360;
        }
        //--------------------------
        //RA precisa de estar no mesmo quadrante que o L
        let Lquadrant = (Math.floor(L / 90)) * 90;
        let RAquadrant = (Math.floor(RA / 90)) * 90;
        RA = RA + (Lquadrant - RAquadrant);
        //--------------------------

        //Converter em horas
        RA = RA / 15;
        //--------------------------
        //calculate the Sun's declination
        let sinDec = 0.39782 * Math.sin(L * SenCosTan);
        let cosDec = Math.cos(Math.asin(sinDec) * ASenACosATan * SenCosTan);
        //--------------------------
        //Calcula o ângulo hora local do Sol
        let cosH = (Math.cos(zenith * SenCosTan) - (sinDec * Math.sin(latitude * SenCosTan))) / (cosDec * Math.cos(latitude * SenCosTan));
        //cosH tem de ser entre 0 e 1, se não for, os calculos estão errados
        if (cosH > 1 || cosH < -1)
        {
            return 00000;
        }
        //--------------------------
        //Calcular H e converter em horas
        let H = 0;
        //true para o sol a nascer
        if (sol == true)
        {
            H = 360 - Math.acos(cosH) * ASenACosATan;
        }
        //false para o sol a pôr  
        if (sol == false)
        {
            H = Math.acos(cosH) * ASenACosATan;
        }
        H = H / 15;
        //--------------------------
        //calculate local mean time of rising/setting
        let T = H + RA - (0.06571 * t) - 6.622;
        //--------------------------
        //adjust back to UTC
        let UT = T - lngHour;
        //Consoante o valor de UT, este tem de ser ajustado entre 0 e 24 adicionando ou subtraindo por 24
        if (UT < 0)
        {
            UT = UT + 24;
        }
        if (UT > 24)
        {
            UT = UT - 24;
        }
        //--------------------------
        //Converter o UT para a hora local, em Portugal segundo um site, o timezone/localOffset é 1
        let localT = UT + 1;
        //Devolve o valor das horas arredondado, ou seja, quando o resultado for 8,4 então será arredondado para 8h
        //e se for 8,7 será arredondado para 9h. Isto porque se assume que ele passam sempre por estas horas certas. 
        return Math.floor(localT);
}

exports.getTemp = async(day, module_id) =>{
    return new Promise((resolve,reject)=>{
        db.all(`select temp as mtemp from data
                where date like ? || '%'
                and module_id = ?`,[day, module_id],(err,row)=>{
            if(err) reject (err);
            if (row.length > 0){
                resolve(row[0].mtemp);
            }
            resolve(null);
        });
    });
};

exports.Tempcrepuscular = async (dayInic, dayFim, module_id) =>{
    let data = new Date(dayInic);
    let DataF = new Date(dayFim);
    let send = [];
    let lng = await calc.getLng(module_id);
    let lat = await calc.getLat(module_id);
    let d;
    let diaAno;
    let horaCrepuscular;
    let tempC;
    for(data; data<=DataF;data.setDate(data.getDate()+1)){
        d = await calc.getFormatedDate(data);
        diaAno = await calc.diaToDiaAno(d);
        horaCrepuscular = await this.horasNascerPor(false, lat, lng, diaAno)
        d= d + " "+ horaCrepuscular;
        tempC = await this.getTemp(d, module_id);
        if(tempC != null){
            send.push({date:d + ":00:00",temp: tempC});
        }
    }
    return send;
}

exports.TCrepuscSend= async (body) => {
    let send = await this.Tempcrepuscular(body.dataInic, body.dataFim, body.module_id);
    return new Promise((resolve,reject)=>{
        resolve(send);
    });
}

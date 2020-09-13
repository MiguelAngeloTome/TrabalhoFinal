import { apiRequest } from "../configs/apiMiddleware";


const MaxMin = (data) =>{
    if(data.length === 0){
        return null
    }
    let Max =data[0].value;
    let Min = data[0].value;
    let send = [];
    for(let i =1; i<data.length; i++){
        if(data[i].value > Max){
            Max = data[i].value;
        }
        if(data[i].value<Min){
            Min = data[i].value
        }

    }
    send.push(Max);
    send.push(Min);
    return send;
}

const MaxMinPhum = (data) =>{

    if(data.length === 0){
        return null
    }
    let Max =data[0].inichum;
    let Min = data[0].inichum;
    let send = [];
    if(data[0].fimhum > Max){
        Max = data[0].fimhum
    }

    if(data[0].fimhum < Min){
        Min = data[0].fimhum
    }

    for(let i =1; i<data.length; i++){
        if(data[i].value > Max){
            Max = data[i].value;
        }
        if(data[i].value<Min){
            Min = data[i].value
        }

    }
    send.push(Max);
    send.push(Min);
    return send;
}



const formatedDate = (data) => {
    let date = new Date(data);
    let month = date.getMonth()+1 + "";
    if(month<10){
        month = "0" + month;
    }
    let day = date.getDate();
    if(day<10){
        day = "0" + day;
    }
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

export default {
    etp: (body) => apiRequest("POST", `/calc/etp`, body),
    pHum: (body) => apiRequest("POST", `/calc/hum`, body),
    pInf: (body) => apiRequest("POST", `/calc/infec`, body),
    pHume: (body) => apiRequest("POST", `/calc/humc`, body),
    hFito: (body) => apiRequest("POST", `/calc/fito`, body),
    tcrepusc: (body) => apiRequest("POST", `/calc/tcrepusc`, body),
    MaxMin,
    formatedDate,
    MaxMinPhum
}
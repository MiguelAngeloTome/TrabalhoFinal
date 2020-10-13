import { apiRequest } from "../configs/apiMiddleware";
export default {
    RRajada: (body) => apiRequest("POST", `/risco/rajada`, body),
    Rincendio: (body) => apiRequest("POST", `/risco/incendio`, body),
    Rgeada: (body) => apiRequest("POST", `/risco/geada`, body),
    Renxurrada: (body) => apiRequest("POST", `/risco/enxurrada`, body),
}
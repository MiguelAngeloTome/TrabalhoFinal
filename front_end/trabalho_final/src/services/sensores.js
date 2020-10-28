import { apiRequest } from "../configs/apiMiddleware";

export default {
    insertSensor: (body) => apiRequest("POST", `/sensores/`, body),
    removeSensor: (id) => apiRequest("DELETE", `/sensores/${id}`),
    getSensoresModulo: (id) => apiRequest("GET", `/sensores/module/${id}`),
  }
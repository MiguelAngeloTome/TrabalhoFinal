import { apiRequest } from "../configs/apiMiddleware";

export default {
  getAll: () => apiRequest("GET", "/data"),
  getModulesVinha: (id) => apiRequest("GET", `/module/vinha/${id}`),
  getOne: (id) => apiRequest("GET", `/data/${id}`),
  getAllModule: (id) => apiRequest("GET", `/data/module/${id}`),
  getLast: (id) => apiRequest("GET", `/data/last/${id}`),
  getTime: (id, body) => apiRequest("POST", `/data/time/${id}`, body),
  remove: (id) => apiRequest("DELETE", `/data/${id}`),
}
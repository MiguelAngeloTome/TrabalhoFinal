import { apiRequest } from "../configs/apiMiddleware";

export default {
    getUserAvisos: (id) => apiRequest("GET", `/avisos/user/${id}`),
    CountUserAvisos: (id) => apiRequest("GET", `/avisos/count/${id}`),
    removeAviso: (id) => apiRequest("DELETE", `/avisos/remove/${id}`),
  }
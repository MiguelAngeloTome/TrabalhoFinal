import { apiRequest } from "../configs/apiMiddleware";

export default {
    add: (body) => apiRequest("POST", `/module/`, body),
    remove : (id) => apiRequest("DELETE", `/module/${id}`),
    getSingleSecModule: (id) => apiRequest("GET", `/module/secure/${id}`),
}
import { apiRequest } from "../configs/apiMiddleware";

export default {
    Excel: (id, body) => apiRequest("POST", `/excel?id=${id}`, body)
}
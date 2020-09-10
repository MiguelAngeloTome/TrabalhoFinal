import { apiRequest } from "../configs/apiMiddleware";

export default {
    add: (body) => apiRequest("POST", `/module/`, body),
}
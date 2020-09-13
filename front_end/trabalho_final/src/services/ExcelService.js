import { apiRequest } from "../configs/apiMiddleware";

export default {
    Excel: (user_id, body, vinha_id, module_name, tipo) => apiRequest("POST", `/excel?user_id=${user_id}&vinha_id=${vinha_id}&module_name=${module_name}&tipo=${tipo}`, body)
}
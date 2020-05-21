import { apiRequest } from "../configs/apiMiddleware";

const add = (body) => {
    return apiRequest("POST", "/vinha", body);
  };

const update = (id, body) =>{
    return apiRequest("PUT", `/vinha/${id}`, body)
}

export default {
    getAll: () => apiRequest("GET", "/vinha"),
    getOne: (id) => apiRequest("GET", `/vinha/${id}`),
    getAllUser: (id) => apiRequest("GET", `/vinhauser/${id}`),
    delete: (id) => apiRequest("DELETE", `/vinha/${id}`),
    add,
    update,

  }
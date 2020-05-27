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
    getAllUser: (id) => apiRequest("GET", `/vinhauser/getVinhaSingle/${id}`),
    getUsersVinha: (id) => apiRequest("GET", `/vinhauser/getUsersVinha/${id}`),
    getModulesUser: (id) => apiRequest("GET", `/vinhauser/getModuleUsers/${id}`),
    getModulesVinha: (id) => apiRequest("GET", `/module/vinha/${id}`),
    delete: (id) => apiRequest("DELETE", `/vinha/${id}`),
    deleteUser_vinha: (body) => apiRequest("DELETE", `/vinhauser/delete`, body),
    deleteModule_vinha: (id) => apiRequest("DELETE", `/module/${id}`),
    add,
    update,

  }
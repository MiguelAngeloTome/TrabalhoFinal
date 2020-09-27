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
    getDonoVinha: (id) => apiRequest("GET", `/vinha/dono/${id}`),
    getAllUser: (id) => apiRequest("GET", `/vinhauser/vinhasFromUser/${id}`),
    getUsersVinha: (id) => apiRequest("GET", `/vinhauser/vinha/user/${id}`),
    getModulesUser: (id) => apiRequest("GET", `/vinhauser/vinhaInfo/${id}`),
    addUser: (body) => apiRequest("POST", `/vinhauser`, body),
    getModulesVinha: (id) => apiRequest("GET", `/module/vinha/${id}`),
    getModule: (id) => apiRequest("GET", `/module/${id}`),
    delete: (id) => apiRequest("DELETE", `/vinha/${id}`),
    deleteUser_vinha: (body) => apiRequest("DELETE", `/vinhauser/delete`, body),
    deleteModule_vinha: (id) => apiRequest("DELETE", `/module/${id}`),
    add,
    update,

  }
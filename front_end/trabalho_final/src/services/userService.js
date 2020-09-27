import { apiRequest } from "../configs/apiMiddleware";

export default {
  getUser: (id) => apiRequest("GET", `/user/${id}`),
  userSimple: () => apiRequest("GET", `/user/simple/get`),
  addUserVinha: (body) => apiRequest("POST", `/vinhauser`, body),
  deleteUserVinha: (body) => apiRequest("DELETE", `/vinhauser/delete`, body),
}
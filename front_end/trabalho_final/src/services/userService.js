import { apiRequest } from "../configs/apiMiddleware";

const getUser = (id) => {
  return apiRequest("GET", `/user/single/${id}`);
};

export default {
  userSimple: () => apiRequest("GET", `/user/user`),
  addUserVinha: (body) => apiRequest("POST", `/vinhauser`, body),
  deleteUserVinha: (body) => apiRequest("DELETE", `/vinhauser/delete`, body),
  getUser,
}
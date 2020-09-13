import { apiRequest } from "../configs/apiMiddleware";

const getUser = (id) => {
  return apiRequest("GET", `/user/single/${id}`);
};

export default {
  userSimple: () => apiRequest("GET", `/user/user`),
  getUser,
}
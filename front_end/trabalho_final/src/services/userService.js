import { apiRequest } from "../configs/apiMiddleware";

const getUser = (id) => {
  return apiRequest("GET", `/user/${id}`);
};

export default {
  getUser,
}
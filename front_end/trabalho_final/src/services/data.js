import { apiRequest } from "../configs/apiMiddleware";

/*const getAll = () => {
    return new Promise ((resolve, reject)=>{
        fetch(`${url}/data`, {method : 'GET'})
        .then(res => res.json())
        .then(books => resolve (books))
        .catch(err => reject (`error GET all`))
    })
}

const getOne = id => {
    return new Promise ((resolve, reject) => {
      fetch (`${url}/data/${id}`, {method: 'GET'})
        .then (res => res.json ())
        .then (books => resolve (books))
        .catch (err => reject (`error GET /book/${id}: ${err.message}`));
    });
  };*/


export default {
  getAll: () => apiRequest("GET", "/data"),
  getOne: (id) => apiRequest("GET", `/data/${id}`),
  getLast: (id) => apiRequest("GET", `/data/last/${id}`),
  getTime:(id, body)=> apiRequest("POST", `/data/time/${id}`, body),
}
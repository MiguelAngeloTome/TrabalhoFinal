const serverURL = "http://localhost:5000";

export const apiRequest = (method, route, body) => {
  let currentUser = sessionStorage.getItem("user");
  return new Promise((resolve, reject) => {
    fetch(serverURL + route, {
      method,
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        ...(currentUser && { Authorization: JSON.parse(currentUser).token }),
      },
      ...(body && { body: JSON.stringify(body) }),
    })
    .then((res) => res.json())
    .then(
      (data) => {if(data.erro !== undefined){
        reject(data.erro)
      }else{
        resolve(data)
      }
    }
      
      )
    .catch((err) => {
      console.error(`error ${method} ${route}: ${err.message}`);
      reject(err);
    });
});
};
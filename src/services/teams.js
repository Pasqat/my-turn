import axios from "axios"
const baseUrl = "/api/team"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const register = async (credential) => {
  const response = await axios.post(baseUrl, credential)
  console.log(response.data)
  return response.data
}

// const update = (id, newObject) => {
//   // TODO this need to be done
//   const request = axios.put(`${baseUrl}/${id}`, newObject);
//   return request.then((response) => response.data);
// };

// const removeTeam = (id) => {
//   const request = axios.delete(`${baseUrl}/${id}`);
//   return request.then((response) => response.data);
// };

export default {
  getAll,
  register,
}

import axios from "axios"
import storage from "../utils/storage.js"
const baseUrl = "/api/team"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const register = async (credential) => {
    const response = await axios.post(baseUrl, credential)
    return response.data
}

const getAcceptedShift = async () => {
    const response = await axios.get(`${baseUrl}/accepted-shift/`, storage.getAxiosConfig())
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
    getAcceptedShift
}

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
    const response = await axios.get(
        `${baseUrl}/accepted-shift/`,
        storage.getAxiosConfig()
    )
    return response.data
}

const updateAcceptedShift = async (newAcceptedShift) => {
    const response = await axios.put(
        `${baseUrl}/accepted-shift/`,
        newAcceptedShift,
        storage.getAxiosConfig()
    )
    return response.data
}

export default {
    getAll,
    register,
    getAcceptedShift,
    updateAcceptedShift,
}

import axios from "axios"
import storage from "../utils/storage"
const baseUrl = "/api/schedule"

const getAll = async () => {
    const request = await axios.get(baseUrl, storage.getAxiosConfig())
    return request.data
}

const getYear = async (year) => {
    const request = await axios.get(`${baseUrl}/${year}`, storage.getAxiosConfig())
    return request.data
}

const getMonth = async (year, month) => {
    const request = await axios.get(
        `${baseUrl}/${year}/${month + 1}`,
        storage.getAxiosConfig()
    )
    return request.data
}

const addNewMember = async (newObject, year, month) => {
    /*
     * body of the request
     * {
     *   teamName: current loggedin team,
     *   teamId: teamId,
     *   name: name of the team member to add
     *   days: []       OPTIONAL
     * }
     */
    const request = await axios.post(
        `${baseUrl}/${year}/${month + 1}`,
        newObject,
        storage.getAxiosConfig()
    )
    return request.data
}

const update = async (year, id, newObject) => {
    const request = await axios.put(
        `${baseUrl}/${year}/${id}`,
        newObject,
        storage.getAxiosConfig()
    )
    return request.data
}

const removeTeamMember = async (year, id) => {
    const request = await axios.delete(`${baseUrl}/${year}/${id}`, storage.getAxiosConfig())
    return request.data
}

export default {
    getAll,
    getYear,
    getMonth,
    addNewMember,
    update,
    removeTeamMember,
}

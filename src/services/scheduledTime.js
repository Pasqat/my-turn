import axios from 'axios'
import storage from '../utils/storage'
const baseUrl = '/api/schedule'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` },
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl, getConfig())
  return request.data
}

const getYear = async (year) => {
  const request = await axios.get(`${baseUrl}/${year}`, getConfig())
  return request.data
}

const getMonth = async (year, month) => {
  const request = await axios.get(
    `${baseUrl}/${year}/${month + 1}`,
    getConfig()
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
    getConfig()
  )
  return request.data
}

const update = async (year, id, newObject) => {
  const request = await axios.put(
    `${baseUrl}/${year}/${id}`,
    newObject,
    getConfig()
  )
  return request.data
}

const removeTeamMember = async (year, id) => {
  const request = await axios.delete(`${baseUrl}/${year}/${id}`, getConfig())
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

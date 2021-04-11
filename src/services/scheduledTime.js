import axios from 'axios'
const baseUrl = '/api/schedule'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getYear = (year) => {
  const request = axios.get(`${baseUrl}/${year}`)
  return request.then(response => response.data)
}

const getMonth = (year, month) => {
  const request = axios.get(`${baseUrl}/${year}/${month}`)
  return request.then(response => response.data)
}

const addNewMember = (newObject, year, month) => {
/*
 * body of the request
 * {
 *   teamName: current loggedin team,
 *   teamId: teamId,
 *   name: name of the team member to add
 *   days: []       OPTIONAL
 * }
 */
  const request = axios.post(`${baseUrl}/${year}/${month}`, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  // TODO this need to be done
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeTeamMember = (year, month, id) => {
  const request = axios.delete(`${baseUrl}/${year}/${month}/${id}`)
  return request.then(response => response.data)
}

export default {
  getAll, getYear, getMonth, addNewMember, update, removeTeamMember
}

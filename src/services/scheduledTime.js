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
  const request = axios.get(`${baseUrl}/${year}/${month + 1}`)
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
  const request = axios.post(`${baseUrl}/${year}/${month + 1}`, newObject)
  return request.then(response => response.data)
}

const update = (year, id, newObject) => {
    console.log('newObject in update', newObject)
  const request = axios.put(`${baseUrl}/${year}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeTeamMember = (year, id) => {
  const request = axios.delete(`${baseUrl}/${year}/${id}`)
  return request.then(response => response.data)
}

export default {
  getAll, getYear, getMonth, addNewMember, update, removeTeamMember
}

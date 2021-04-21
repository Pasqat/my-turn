import axios from "axios";
const baseUrl = "/api/schedule";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getYear = async (year) => {
  const request = await axios.get(`${baseUrl}/${year}`);
  return request.data;
};

const getMonth = async (year, month) => {
  const request = await axios.get(`${baseUrl}/${year}/${month + 1}`);
  return request.data;
  // return request.then((response) => response.data);
};

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
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.post(
    `${baseUrl}/${year}/${month + 1}`,
    newObject,
    config
  );
  return request.data;
};

const update = async (year, id, newObject) => {
  const request = await axios.put(`${baseUrl}/${year}/${id}`, newObject);
  return request.data;
};

const removeTeamMember = async (year, id) => {
  const config = {
    headers: { Authorization: token }
  };

  const request = await axios.delete(`${baseUrl}/${year}/${id}`, config);
  return request.data;
};

export default {
  getAll,
  getYear,
  getMonth,
  addNewMember,
  update,
  removeTeamMember,
  setToken
};

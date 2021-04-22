import axios from "axios";
const baseUrl = "/api/schedule";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log("this is setToken", token);
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.get(baseUrl, config);
  return request.data;
};

const getYear = async (year) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.get(`${baseUrl}/${year}`, config);
  return request.data;
};

const getMonth = async (year, month) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.get(`${baseUrl}/${year}/${month + 1}`, config);
  return request.data;
};

const addNewMember = async (newObject, year, month) => {
  const config = {
    headers: { Authorization: token },
  };

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
    config
  );
  return request.data;
};

const update = async (year, id, newObject) => {

  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.put(
    `${baseUrl}/${year}/${id}`,
    newObject,
    config
  );
  return request.data;
};

const removeTeamMember = async (year, id) => {
  const config = {
    headers: { Authorization: token },
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
  setToken,
};

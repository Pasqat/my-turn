import axios from "axios";
const baseUrl = "/api/login";

const login = async (credential) => {
  const response = await axios.post(baseUrl, credential);
  return response.data;
};

const register = async (credential) => {
    const response = await axios.post("/api/team", credential);
}

export default { login, register };

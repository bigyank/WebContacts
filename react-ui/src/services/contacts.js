import axios from "axios";

const baseUrl = "/api/contacts";
const loginUrl = "api/login";
const signupUrl = "api/signup";

const config = () => {
  const token = localStorage.getItem("loggedUser");
  const parsedToken = JSON.parse(token).token;
  return {
    headers: {
      Authorization: `bearer ${parsedToken}`,
    },
  };
};

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  localStorage.setItem("loggedUser", JSON.stringify(response.data));
  return response.data;
};

const signup = async (credentials) => {
  const response = await axios.post(signupUrl, credentials);
  localStorage.setItem("loggedUser", JSON.stringify(response.data));
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, config());
  return response.data.records;
};

const addNew = async (object) => {
  const response = await axios.post(baseUrl, object, config());
  return response.data;
};

const deleteContact = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config());
  return response.data;
};

const addLink = async (id, object) => {
  const response = await axios.post(`${baseUrl}/${id}/url`, object, config());
  return response.data;
};

const editLink = async (id, urlId, object) => {
  const response = await axios.patch(
    `${baseUrl}/${id}/url/${urlId}`,
    object,
    config()
  );
  return response.data;
};

const deleteLink = async (id, urlId) => {
  const response = await axios.delete(
    `${baseUrl}/${id}/url/${urlId}`,
    config()
  );
  return response.data;
};

export default {
  login,
  signup,
  getAll,
  addNew,
  deleteContact,
  addLink,
  editLink,
  deleteLink,
};

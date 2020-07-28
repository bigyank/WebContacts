import axios from 'axios';

const baseUrl = '/api/contacts';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addNew = async (object) => {
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const addLink = async (id, object) => {
  const response = await axios.post(`${baseUrl}/${id}/url`, object);
  return response.data;
};

export default {
  getAll,
  addNew,
  addLink,
};

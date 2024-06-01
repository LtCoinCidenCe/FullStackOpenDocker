import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = function (novaToken)
{
  token = `Bearer ${novaToken}`;
};

const getAll = () =>
{
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async (newblog) =>
{
  const response = await axios.post(baseUrl, newblog, { headers: { Authorization: token } });
  return response.data;
};

const update = async (id, newblog) =>
{
  const response = await axios.put(`${baseUrl}/${id}`, newblog, { headers: { Authorization: token } });
  return response.data;
};

const remove = async (id) =>
{
  const response = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } });
  return response.data;
};

const blogService = { setToken, getAll, create, update, remove };
export default blogService;

import axios from 'axios';
const baseUrl = '/api/blogs';

const postComment = async (id, comment) =>
{
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

const commentService = { postComment };
export default commentService;
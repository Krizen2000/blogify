import axios from "axios";

export async function requestUserBlogs(token) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  let blogs = [];
  try {
    const res = await axiosInstance.get(`/api/blogs/publishedBy`);
    console.log("requestUserBlogs:", res.data);
    blogs = res.data.blogs;
  } catch (err) {
    console.error(err);
    return [];
  }
  return blogs;
}

export async function requestBlogDeletion(token, blogId) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    const res = await axiosInstance.delete(`/api/blogs/${blogId}`);
    console.log("requestBlogDeletion:", res.data);
  } catch (err) {
    console.error(err);
  }
}

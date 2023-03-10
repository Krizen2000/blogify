import axios from "axios";

export async function requestRecentBlogs() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  let blogs = [];
  try {
    const res = await axiosInstance.get(`/api/blogs/recent`);
    blogs = res.data.blogs;
    console.log("requestRecentBlogs:", res.data);
  } catch (err) {
    console.error(err);
    return [];
  }
  return blogs;
}

export async function requestAllBlogs() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  let blogs = [];
  try {
    const res = await axiosInstance.get(`/api/blogs/all`);
    blogs = res.data.blogs;
    console.log("requestAllBlogs:", res.data);
  } catch (err) {
    console.error(err);
    return [];
  }
  return blogs;
}

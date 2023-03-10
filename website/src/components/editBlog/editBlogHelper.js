import axios from "axios";

export async function requestBlogUpdation(token, prevBlogId, data) {
  console.log("requestBlogCreation", data);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    const res = await axiosInstance.post(`/api/blogs/${prevBlogId}`, data);
    console.log("requestBlogCreation:", res.data);
  } catch (err) {
    console.error(err);
  }
}

export async function requestBlogDetails(blogId) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  let blog = null;
  try {
    const res = await axiosInstance.get(`/api/blogs/find/${blogId}`);
    blog = res.data;
    console.log("requestBlogDetails:", res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
  return blog;
}

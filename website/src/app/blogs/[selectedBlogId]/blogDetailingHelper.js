import axios from "axios";

const initialBlog = { title: "", image: "", description: "", publisher: "" };
export async function requestBlogDetails(token, blogId) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  let blog = null;
  try {
    const res = await axiosInstance.get(`/api/blogs/find/${blogId}`);
    blog = res.data;
  } catch (err) {
    console.error(err);
    return initialBlog;
  }
  return blog;
}

export async function requestRecentBlogs() {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
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

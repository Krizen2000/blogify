import axios from "axios";

export async function requestUserBlogs(token) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  let blogs = [];
  try {
    const res = await axiosInstance.get(`/api/blogs/publishedBy`);
    blogs = res.data.blogs;
  } catch (err) {
    console.error(err);
    return [];
  }
  return blogs;
}

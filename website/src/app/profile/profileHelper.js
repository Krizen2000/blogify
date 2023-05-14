import axios from "axios";

export async function requestUserInfo(token) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  let user = null;
  try {
    const res = await axiosInstance.get(`/api/users/`);
    if (!res.data) return;
    user = res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
  return user;
}

export async function requestUserInfoUpdate(token, data) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    await axiosInstance.put(`/api/users/`, data);
  } catch (err) {
    console.error(err);
  }
}

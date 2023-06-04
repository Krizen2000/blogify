import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

export async function GET(request: NextRequest) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  let res: AxiosResponse;
  try {
    res = await axiosInstance.get("/api/blogs/all");
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("GET(api/blogs) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const token = request.headers.get("Authorization")?.split(" ").at(1);
  console.log("Check for carriage return: ", token);
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  console.log("POST(api/blogs) API Router: ", data);
  let res: AxiosResponse;
  try {
    res = await axiosInstance.post("/api/blogs", data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("POST(api/blogs) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const blogId = request.nextUrl.searchParams.get("blogId");
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  console.log("GET(api/comments/search) API Router: blogId - ", blogId);
  let res: AxiosResponse;
  try {
    res = await axiosInstance.get(`/api/comments/search?blogId=${blogId}`);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("GET(api/comments/search) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

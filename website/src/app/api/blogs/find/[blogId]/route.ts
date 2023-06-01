import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params: { blogId },
  }: {
    params: { blogId: string };
  }
) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  console.log("GET(api/blogs) API Router: blogId - ", blogId);
  let res: AxiosResponse;
  try {
    res = await axiosInstance.get(`/api/blogs/find/${blogId}`);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("GET(api/blogs) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

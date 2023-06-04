import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  {
    params: { blogId },
  }: {
    params: { blogId: string };
  }
) {
  const rawToken = request.headers.get("Authorization");
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: rawToken },
  });
  console.log("PUT(api/blogs/dislike) API Router: blogId - ", blogId);
  let res: AxiosResponse;
  try {
    res = await axiosInstance.put(`/api/blogs/${blogId}/dislike`);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("PUT(api/blogs/dislike) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { blogId } }: { params: { blogId: string } }
) {
  const rawToken = request.headers.get("Authorization");
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: rawToken },
  });
  console.log("DELETE(api/myblogs) API Router: rawToken - ", rawToken);
  let res: AxiosResponse;
  try {
    res = await axiosInstance.delete(`/api/blogs/${blogId}`);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("(api/myblogs) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

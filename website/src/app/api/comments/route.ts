import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const rawToken = request.headers.get("Authorization");
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: rawToken },
  });
  console.log("POST(api/comments) API Router: data - ", data);
  let res: AxiosResponse;
  try {
    res = await axiosInstance.post(`/api/comments`, data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("POST(api/commments) PUB_API res:", res.data);
  return NextResponse.json(res.data, { status: 201 });
}

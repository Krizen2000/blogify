import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  console.log("(api/login) API Router: ", data);
  let res: AxiosResponse;
  try {
    res = await axiosInstance.post("/api/login", data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("(api/login) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

export async function GET(request: NextRequest) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  let res: AxiosResponse;
  try {
    res = await axiosInstance.get("/api/communities");
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("GET(api/communities) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

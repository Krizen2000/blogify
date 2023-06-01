import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

export async function GET(request: NextRequest) {
  const publisher = request.nextUrl.searchParams.get("publisher");
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  console.log("(api/myblogs) API Router: Publisher - ", publisher);
  let res: AxiosResponse;
  try {
    res = await axiosInstance.get(
      `/api/blogs/publishedBy?publisher=${publisher}`
    );
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("(api/myblogs) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

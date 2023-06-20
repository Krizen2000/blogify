import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const rawToken = request.headers.get("Authorization");
  console.log("Auth Token: ", rawToken);
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: rawToken },
  });
  console.log("PUT(api/users/planVerify) API Router: ", data);
  let res: AxiosResponse;
  try {
    res = await axiosInstance.put("/api/users/planVerify", data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log("PUT(api/users/planVerify) PUB_API res:", res.data);
  return NextResponse.json(res.data);
}

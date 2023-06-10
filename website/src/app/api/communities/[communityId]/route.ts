import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

export async function GET(
  request: NextRequest,
  { params: { communityId } }: { params: { communityId: string } }
) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  let res: AxiosResponse;
  try {
    res = await axiosInstance.get(
      `/api/communities/search?communityId=${communityId}`
    );
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log(`GET(/api/communities/${communityId}) PUB_API res:`, res.data);
  return NextResponse.json(res.data);
}

export async function PUT(
  request: NextRequest,
  { params: { communityId } }: { params: { communityId: string } }
) {
  const rawToken = request.headers.get("Authorization");
  const data = await request.json();
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: rawToken,
    },
  });
  let res: AxiosResponse;
  try {
    res = await axiosInstance.put(`/api/communities/${communityId}`, data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log(`PUT(/api/communities/${communityId}) PUB_API res:`, res.data);
  return NextResponse.json(res.data);
}

export async function DELETE(
  request: NextRequest,
  { params: { communityId } }: { params: { communityId: string } }
) {
  const rawToken = request.headers.get("Authorization");
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: rawToken,
    },
  });
  let res: AxiosResponse;
  try {
    res = await axiosInstance.delete(`/api/communities/${communityId}`);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  console.log(`DELETE(/api/communities/${communityId}) PUB_API res:`, res.data);
  return NextResponse.json(res.data);
}

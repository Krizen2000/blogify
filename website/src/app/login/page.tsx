"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useCacheContext } from "@context/cacheProvider";

const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const isValidPhoneNumber = /^[0-9]|[\+]/g;

type DataPacket = {
  password: string;
  email: string;
  phoneNumber: string;
  username: string;
};
type UserInfo = {
  token: string;
  name: string;
  username: string;
};
type Cache = {
  token: string | null;
  name: string | null;
  username: string | null;
  isSubscribed: boolean;
};

async function requestUserLogin(
  loginId: string,
  password: string
): Promise<UserInfo | null> {
  let idTag = loginId.match(isValidEmail)
    ? "email"
    : loginId.match(isValidPhoneNumber)
    ? "phoneNumber"
    : "username";
  let dataPacket = { password };

  // @ts-ignore "Dynamic nature of the attribute"
  dataPacket[idTag] = loginId;
  let res = null;
  try {
    res = await axios.post(`/api/login`, dataPacket);
  } catch (err) {
    console.error(res);
    return null;
  }
  if (!res.data.token) {
    console.error(res);
    return null;
  }
  const name = [res.data.firstName, res.data.lastName].join(" ");
  const token = res.data.token;
  const username = res.data.username;
  return { token, name, username };
}

export default function Login() {
  const cacheContext = useCacheContext();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const resetAction = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoginId("");
    setPassword("");
  };
  const submitAction = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await requestUserLogin(loginId, password);
    if (!data) return;
    const { token, name, username } = data;

    if (!token) return;
    cacheContext.setCache((storedCache: Cache) => ({
      ...storedCache,
      token,
      name,
      username,
    }));
    router.back();
  };
  return (
    <main>
      <button onClick={() => router.back()}>
        <i className="bi-arrow-left" />
      </button>
      <h1>Login</h1>
      <form style={{ display: "grid" }}>
        <label>Username / Email / PhoneNumber</label>
        <input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <Link style={{ justifySelf: "center" }} href="/signup">
        Don't have an account? SignUpfirst
      </Link>
      <div>
        <button type="reset" onClick={resetAction}>
          Clear
        </button>
        <button type="submit" onClick={submitAction}>
          Login
        </button>
      </div>
    </main>
  );
}

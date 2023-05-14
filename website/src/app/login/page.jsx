"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useCacheContext } from "@context/cacheProvider";

const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const isValidPhoneNumber = /^[0-9]|[\+]/g;
async function requestUserLogin(loginId, password) {
  let idTag = loginId.match(isValidEmail)
    ? "email"
    : loginId.match(isValidPhoneNumber)
    ? "phoneNumber"
    : "username";
  let dataPacket = { password };
  dataPacket[idTag] = loginId;
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  let res = null;
  try {
    res = await axiosInstance.post(`/api/login`, dataPacket);
  } catch (err) {
    console.error(res);
    return null;
  }
  if (!res.data.token) {
    console.error(res);
    return null;
  }
  const name = [res.data.firstName, res.data.lastName].join(" ");
  return [res.data.token, name];
}

const Container = styled.section`
  display: grid;
  gap: 1rem;
`;
const Button = styled.button`
  min-height: 5rem;
  min-width: 5rem;
`;
const Icon = styled.i`
  font-size: 2rem;
`;
const CredentialForm = styled.form`
  display: grid;
  margin: 0rem 1rem;
  padding: 2rem;
  background-color: var(--bs-gray-100);
  border: 0.00625rem solid var(--bs-gray-500);
  border-radius: 0.5rem;
`;
const ButtonWrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0rem 1rem;
  grid-template-columns: repeat(2, 1fr);
`;

export default function Login() {
  const cacheContext = useCacheContext();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button className="btn" onClick={() => router.back()}>
          <Icon className="bi-arrow-left" />
        </Button>
        <h1>Login</h1>
      </div>
      <CredentialForm id="userCredentials">
        <label className="form-label">Username / Email / PhoneNumber</label>
        <input
          className="form-control"
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CredentialForm>
      <Link style={{ justifySelf: "center" }} href="/signup">
        Don't have an account? SignUpfirst
      </Link>
      <ButtonWrapper>
        <button
          type="reset"
          className="btn btn-secondary"
          onClick={() => {
            setLoginId("");
            setPassword("");
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={async () => {
            const [token, name] = await requestUserLogin(loginId, password);
            if (!token) return;
            cacheContext.setCache({ ...cacheContext.cache, token, name });
            router.back();
          }}
        >
          Login
        </button>
      </ButtonWrapper>
    </Container>
  );
}

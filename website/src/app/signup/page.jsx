"use client";

import axios from "axios";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { CacheContext } from "@context/cacheProvider";

async function requestUserSignup(
  username,
  firstName,
  lastName,
  phoneNumber,
  email,
  password
) {
  const dataPacket = {
    username,
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  };
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  console.log();

  let res = null;
  try {
    res = await axiosInstance.post(`/api/register`, dataPacket);
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!res.data.token) {
    console.error(res);
    return null;
  }
  const name = [firstName, lastName].join(" ");
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
const Text = styled.text`
  display: grid;
  justify-content: center;
  color: var(--bs-danger);
`;
const ButtonWrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0.5rem 1rem;
  grid-template-columns: repeat(2, 1fr);
`;

export default function SignUp() {
  const cacheContext = useContext(CacheContext);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button className="btn" onClick={() => router.back()}>
          <Icon className="bi-arrow-left" />
        </Button>
        <h1>Sign Up</h1>
      </div>
      <CredentialForm>
        <label className="form-label">UserName</label>
        <input
          className="form-control"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="form-label">First Name</label>
        <input
          className="form-control"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="form-label">Last Name</label>
        <input
          className="form-control"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="form-label">Phone Number</label>
        <input
          className="form-control"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label">Confirm Password</label>
        <input
          className="form-control"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {password !== confirmPassword ? (
          <Text className="form-text">
            Password is not matching with Confirm Password
          </Text>
        ) : null}
      </CredentialForm>
      <Link style={{ justifySelf: "center" }} href="/login">
        Already a user? Login
      </Link>
      <ButtonWrapper>
        <button
          type="reset"
          className="btn btn-secondary"
          onClick={() => {
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setEmail("");
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={async () => {
            if (password !== confirmPassword) return;
            const [token, name] = await requestUserSignup(
              username,
              firstName,
              lastName,
              phoneNumber,
              email,
              password
            );
            if (!token) return;
            cacheContext.setCache({ ...cacheContext.cache, token, name });
            router.back();
          }}
        >
          Create an account
        </button>
      </ButtonWrapper>
    </Container>
  );
}

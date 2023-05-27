"use client";

import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCacheContext } from "@context/cacheProvider";

async function requestUserSignup(
  username: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  password: string
): Promise<string[] | null> {
  const dataPacket = {
    username,
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  };

  let res = null;
  try {
    res = await axios.post(`/api/register`, dataPacket);
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

export default function SignUp() {
  const cacheContext = useCacheContext();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  return (
    <main>
      <div>
        <button onClick={() => router.back()}>
          <i className="bi-arrow-left" />
        </button>
        <h1>Sign Up</h1>
      </div>
      <form style={{ display: "grid" }}>
        <label>UserName</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {password !== confirmPassword ? (
          <p>Password is not matching with Confirm Password</p>
        ) : null}
      </form>
      <Link style={{ justifySelf: "center" }} href="/login">
        Already a user? Login
      </Link>
      <div>
        <button
          type="reset"
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
          onClick={async () => {
            if (password !== confirmPassword) return;
            const value = await requestUserSignup(
              username,
              firstName,
              lastName,
              phoneNumber,
              email,
              password
            );
            if (!value) return;
            const [token, name] = value;

            if (!token) return;
            cacheContext.setCache({ ...cacheContext.cache, token, name });
            router.back();
          }}
        >
          Create an account
        </button>
      </div>
    </main>
  );
}

"use client";

import styles from "./style.module.css";
import axios from "axios";
import { MouseEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCacheContext } from "@context/cacheProvider";

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

async function requestUserSignup(
  username: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  password: string
): Promise<UserInfo | null> {
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
  const token = res.data.token;
  return { token, name, username };
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

  const resetAction = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUsername("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const submitAction = async (e: MouseEvent<HTMLButtonElement>) => {
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
    const { token, name, username: userid } = value;

    if (!token) return;
    cacheContext.setCache({
      ...cacheContext.cache,
      token,
      name,
      username: userid,
    });
    cacheContext.setCache((storedCache: Cache) => ({
      ...storedCache,
      token,
      name,
      username: userid,
    }));
    router.back();
  };

  const router = useRouter();
  return (
    <main className={styles["signup-container"]}>
      <h1 className={styles["header-text"]}>Sign Up</h1>
      <form className={styles["form"]}>
        <label className={styles["label"]}>UserName</label>
        <input
          className={styles["input"]}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={styles["label"]}>First Name</label>
        <input
          className={styles["input"]}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className={styles["label"]}>Last Name</label>
        <input
          className={styles["input"]}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className={styles["label"]}>Phone Number</label>
        <input
          className={styles["input"]}
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label className={styles["label"]}>Email</label>
        <input
          className={styles["input"]}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className={styles["label"]}>Password</label>
        <input
          className={styles["input"]}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className={styles["label"]}>Confirm Password</label>
        <input
          className={styles["input"]}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {password !== confirmPassword ? (
          <p className={styles["password-check"]}>
            Password is not matching with Confirm Password
          </p>
        ) : null}
      </form>
      <Link className={styles["link"]} href="/login">
        Already a user? Login
      </Link>
      <div className={styles["button-group"]}>
        <button
          className={styles["secondary-btn"]}
          type="reset"
          onClick={resetAction}
        >
          Clear
        </button>
        <button
          className={styles["primary-btn"]}
          type="submit"
          onClick={submitAction}
        >
          Create an account
        </button>
      </div>
    </main>
  );
}

"use client";
import { FormEvent, SetStateAction, useRef } from "react";
import styles from "./newsLetterForm.module.css";
import axios, { AxiosResponse } from "axios";
import { useCacheContext } from "@context/cacheProvider";
import { useEffect, useState } from "react";

function useCheckSubscribed() {
  let [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const cacheContext = useCacheContext();

  useEffect(() => {
    setIsSubscribed(cacheContext.cache["isSubscribed"] ? true : false);
  }, [cacheContext.cache["isSubscribed"]]);

  return { isSubscribed, setIsSubscribed };
}

const uploadCredentials = async (email: string): Promise<boolean> => {
  const data = { email };
  let res: AxiosResponse;
  try {
    res = await axios.post("/api/newsletter", data);
  } catch (err) {
    console.error(err);
    return false;
  }
  console.log("api/newsletter res:", res.data);
  return true;
};

const NewsLetterForm: React.FC = () => {
  const cacheContext = useCacheContext();
  let { isSubscribed, setIsSubscribed } = useCheckSubscribed();
  const newsLetterBox = useRef<HTMLInputElement>(null);
  const submitAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = newsLetterBox.current?.value;
    console.log("Email: ", email);
    if (!email) return;
    uploadCredentials(email).then(() => {
      cacheContext.setCache((cache: {}) => ({ ...cache, isSubscribed: true }));
      setIsSubscribed(true);
    });
  };
  return (
    <>
      {isSubscribed ? (
        <>
          <i className={`bi-check-circle-fill ${styles["completed-icon"]}`} />
        </>
      ) : (
        <form className={styles["form"]} onSubmit={submitAction}>
          <input
            ref={newsLetterBox}
            type="email"
            className={styles["newsletter-box"]}
          />
          <button type="submit" className={styles["cta-btn"]}>
            Subscribe
          </button>
        </form>
      )}
    </>
  );
};

export default NewsLetterForm;

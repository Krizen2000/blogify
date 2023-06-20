"use client";

import styles from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCacheContext } from "@context/cacheProvider";
import Link from "next/link";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  profession: string;
  discord: string;
  facebook: string;
  instagram: string;
  twitter: string;
  subscription: {
    planName: string;
    razorpayOrderId: string | null;
    razorpayPaymentId: string | null;
    razorpaySignature: string | null;
  } | null;
};

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profession: string;
  discord: string;
  facebook: string;
  instagram: string;
  twitter: string;
};

async function requestUserInfo(token: string): Promise<User | null> {
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  let user = null;
  try {
    const res = await axiosInstance.get(`/api/users/`);
    if (!res.data) return null;
    user = res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
  return user;
}

async function requestUserInfoUpdate(token: string, data: UserData) {
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    await axiosInstance.put(`/api/users/`, data);
  } catch (err) {
    console.error(err);
  }
}

const initialIsDisabled = {
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  profession: true,
  discord: true,
  facebook: true,
  instagram: true,
  twitter: true,
};
const initialUserInfo = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  profession: "",
  discord: "",
  facebook: "",
  instagram: "",
  twitter: "",
  subscription: null,
};

// ! NEED TO IMPLEMENT SUBSCRIPTION TYPE
export default function Profile() {
  const cacheContext = useCacheContext();
  const token = cacheContext.cache["token"];
  const [userInfo, setUserInfo] = useState<User>(initialUserInfo);
  const [subscription, setSubscription] = useState("free");
  const [newUserInfo, setNewUserInfo] = useState<User>(initialUserInfo);
  const [commute, setCommute] = useState("None");
  const [shareCommute, setShareCommute] = useState(false);
  const [updateUserInfo, setUpdateUserInfo] = useState(false);
  const [isDisabled, setIsDisabled] = useState(initialIsDisabled);

  // @ts-ignore
  const isUserInfoChanged = (entry) => userInfo[entry] !== newUserInfo[entry];
  const router = useRouter();

  useEffect(() => {
    requestUserInfo(token).then((user) => {
      if (!user) return;
      setUserInfo(user);
      setSubscription(user?.subscription?.planName.toUpperCase() ?? "FREE");
      setNewUserInfo(user);
    });
  }, [token]);

  useEffect(() => {
    if (!updateUserInfo) return;
    setUpdateUserInfo(false);

    let userData = { ...newUserInfo };
    // @ts-ignore "Dynamic nature of the attribute"
    if (shareCommute) userData["commute"] = commute;

    requestUserInfoUpdate(token, userData).then(() => setUserInfo(newUserInfo));
  }, [updateUserInfo]);

  return (
    <main className={styles["profile-container"]}>
      <h1 className={styles["header-text"]}>Profile</h1>
      <section className={styles["personal-info"]}>
        <div className={styles["block-wrapper"]}>
          <i className={`bi-person-circle ${styles["header-icon"]}`} />
          <h3 className={styles["sub-header-text"]}>Personal Information:</h3>
        </div>
        <form className={styles["credentials"]}>
          <label className={styles["label"]}>First Name</label>
          <div className={styles["input-group"]}>
            <input
              className={styles["input"]}
              type="text"
              defaultValue={newUserInfo.firstName}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, firstName: e.target.value })
              }
              disabled={isDisabled.firstName}
            />
            <button
              className={styles["btn"]}
              type="button"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  firstName: !isDisabled.firstName,
                });
                if (isUserInfoChanged("firstName")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`${styles["icon"]} ${
                  isDisabled.firstName ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label className={styles["label"]}>Last Name</label>
          <div className={styles["input-group"]}>
            <input
              className={styles["input"]}
              type="text"
              defaultValue={newUserInfo.lastName}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, lastName: e.target.value })
              }
              disabled={isDisabled.lastName}
            />
            <button
              className={styles["btn"]}
              type="button"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  lastName: !isDisabled.lastName,
                });
                if (isUserInfoChanged("lastName")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`${styles["icon"]} ${
                  isDisabled.lastName ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label className={styles["label"]}>Profession</label>
          <div className={styles["input-group"]}>
            <input
              className={styles["input"]}
              type="text"
              defaultValue={newUserInfo.profession}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, profession: e.target.value })
              }
              disabled={isDisabled.profession}
            />
            <button
              className={styles["btn"]}
              type="button"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  profession: !isDisabled.profession,
                });
                if (isUserInfoChanged("profession")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`${styles["icon"]} ${
                  isDisabled.profession ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label className={styles["label"]}>Phone Number</label>
          <div className={styles["input-group"]}>
            <input
              className={styles["input"]}
              type="text"
              defaultValue={newUserInfo.phoneNumber}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, phoneNumber: e.target.value })
              }
              disabled={isDisabled.phoneNumber}
            />
            <button
              className={styles["btn"]}
              type="button"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  phoneNumber: !isDisabled.phoneNumber,
                });
                if (isUserInfoChanged("phoneNumber")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`${styles["icon"]} ${
                  isDisabled.phoneNumber ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label className={styles["label"]}>Email</label>
          <div className={styles["input-group"]}>
            <input
              className={styles["input"]}
              type="text"
              defaultValue={newUserInfo.email}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, email: e.target.value })
              }
              disabled={isDisabled.email}
            />
            <button
              className={styles["btn"]}
              type="button"
              onClick={(e) => {
                setIsDisabled({ ...isDisabled, email: !isDisabled.email });
                if (isUserInfoChanged("email")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`${styles["icon"]} ${
                  isDisabled.email ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
        </form>
      </section>
      <section className={styles["com-channel"]}>
        <div className={styles["block-wrapper"]}>
          <i className={`bi-telephone-fill ${styles["header-icon"]}`} />
          <h3 className={styles["sub-header-text"]}>Communication Channel:</h3>
        </div>
        <form className={styles["credentials"]}>
          <label className={styles["label"]}>Discord</label>
          <div className={styles["input-group"]}>
            <input
              className={styles["input"]}
              type="text"
              defaultValue={newUserInfo.discord}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, discord: e.target.value })
              }
              disabled={isDisabled.discord}
            />
            <button
              type="button"
              className={styles["btn"]}
              onClick={(e) => {
                setIsDisabled({ ...isDisabled, discord: !isDisabled.discord });
                if (isUserInfoChanged("discord")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`${styles["icon"]} ${
                  isDisabled.discord ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label className={styles["label"]}>Instagram</label>
          <div className={styles["input-group"]}>
            <input
              className={styles["input"]}
              type="text"
              defaultValue={newUserInfo.instagram}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, instagram: e.target.value })
              }
              disabled={isDisabled.instagram}
            />
            <button
              type="button"
              className={styles["btn"]}
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  instagram: !isDisabled.instagram,
                });
                if (isUserInfoChanged("instagram")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`${styles["icon"]} ${
                  isDisabled.instagram ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label className={styles["label"]}>Facebook</label>
          <div className={styles["input-group"]}>
            <input
              className={styles["input"]}
              type="text"
              defaultValue={newUserInfo.facebook}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, facebook: e.target.value })
              }
              disabled={isDisabled.facebook}
            />
            <button
              type="button"
              className={styles["btn"]}
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  facebook: !isDisabled.facebook,
                });
                if (isUserInfoChanged("facebook")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`${styles["icon"]} ${
                  isDisabled.facebook ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label className={styles["label"]}>Twitter</label>
          <div className={styles["input-group"]}>
            <input
              className={styles["input"]}
              type="text"
              defaultValue={newUserInfo.twitter}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, twitter: e.target.value })
              }
              disabled={isDisabled.twitter}
            />
            <button
              type="button"
              className={styles["btn"]}
              onClick={(e) => {
                setIsDisabled({ ...isDisabled, twitter: !isDisabled.twitter });
                if (isUserInfoChanged("twitter")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`${styles["icon"]} ${
                  isDisabled.twitter ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
        </form>
      </section>
      <section className={styles["blog-prefer"]}>
        <div className={styles["block-wrapper"]}>
          <i className={`bi-file-post ${styles["header-icon"]}`} />
          <h3 className={styles["sub-header-text"]}>Blog Peference:</h3>
        </div>
        <form className={styles["credentials"]}>
          <div className={styles["block-wrapper"]}>
            <p className={styles["txt"]}>{"Communicate via:"}</p>
            <select
              className={styles["select"]}
              disabled={!shareCommute}
              defaultValue={commute}
              onChange={(e) => setCommute(e.target.value)}
            >
              {[
                "None",
                "Email",
                "Discord",
                "Facebook",
                "Instagram",
                "Twitter",
              ].map((socialMedia) => (
                <option value={socialMedia}>{socialMedia}</option>
              ))}
            </select>
          </div>
          <div className={styles["block-wrapper"]}>
            <input
              className={styles["input"]}
              type="checkbox"
              checked={shareCommute}
              onChange={(e) => setShareCommute(!shareCommute)}
            />
            <p className={styles["txt"]}>
              {"I agree to share my social handle with my blog readers"}
            </p>
          </div>
        </form>
      </section>
      <section className={styles["sub-section"]}>
        <div className={styles["block-wrapper"]}>
          <i className={`bi-patch-check-fill ${styles["header-icon"]}`} />
          <h3 className={styles["sub-header-text"]}>Subscription:</h3>
        </div>
        <form className={styles["credentials"]}>
          <label className={styles["label"]}>Current Subscription</label>
          <input
            className={styles["subscription-box"]}
            value={subscription}
            disabled
          />
          {subscription !== "FREE" ? (
            <>
              <label className={styles["label"]}>Subscription ID</label>
              <input
                className={styles["input"]}
                value={
                  userInfo.subscription?.razorpayOrderId ??
                  "ERROR INVALID STATE"
                }
                disabled
              />
              <label className={styles["label"]}>Payment ID</label>
              <input
                className={styles["input"]}
                value={
                  userInfo.subscription?.razorpayPaymentId ??
                  "ERROR INVALID STATE"
                }
                disabled
              />
              <label className={styles["label"]}>Payment Signature</label>
              <input
                className={styles["input"]}
                value={
                  userInfo.subscription?.razorpaySignature ??
                  "ERROR INVALID STATE"
                }
                disabled
              />
            </>
          ) : null}
          <Link href="/pricing" className={styles["primary-btn"]}>
            Upgrade
          </Link>
        </form>
      </section>
    </main>
  );
}

"use client";

import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCacheContext } from "@context/cacheProvider";
import { requestUserInfo, requestUserInfoUpdate } from "./profileHelper";

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
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  profession: "",
  discord: "",
  facebook: "",
  instagram: "",
  twitter: "",
};
export default function Profile() {
  const cacheContext = useCacheContext();
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [newUserInfo, setNewUserInfo] = useState(initialUserInfo);
  const [commute, setCommute] = useState("None");
  const [shareCommute, setShareCommute] = useState(false);
  const [updateUserInfo, setUpdateUserInfo] = useState(false);
  const [isDisabled, setIsDisabled] = useState(initialIsDisabled);

  // @ts-ignore
  const isUserInfoChanged = (entry) => userInfo[entry] !== newUserInfo[entry];
  const router = useRouter();

  useEffect(() => {
    requestUserInfo(cacheContext.cache["token"]).then((user) => {
      const { username, ...userData } = user;
      setUserInfo(userData);
      setNewUserInfo(userData);
    });
  }, []);

  useEffect(() => {
    if (!updateUserInfo) return;
    setUpdateUserInfo(false);

    let userData = { ...newUserInfo };
    // @ts-ignore
    if (shareCommute) userData["commute"] = commute;

    requestUserInfoUpdate(cacheContext.cache["token"], userData).then(() =>
      setUserInfo(newUserInfo)
    );
  }, [updateUserInfo]);

  return (
    <main className={styles["profile-container"]}>
      <h1>Profile</h1>
      <section>
        <div>
          <i className={`bi-person-circle ${styles["person-icon"]}`} />
          <h3>Personal Information:</h3>
        </div>
        <form className={styles["credentials"]}>
          <label>First Name</label>
          <div>
            <input
              type="text"
              value={newUserInfo.firstName}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, firstName: e.target.value })
              }
              disabled={isDisabled.firstName}
            />
            <button
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
                className={`icon ${
                  isDisabled.firstName ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label>Last Name</label>
          <div>
            <input
              type="text"
              value={newUserInfo.lastName}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, lastName: e.target.value })
              }
              disabled={isDisabled.lastName}
            />
            <button
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
                className={`icon ${
                  isDisabled.lastName ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label>Profession</label>
          <div>
            <input
              type="text"
              value={newUserInfo.profession}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, profession: e.target.value })
              }
              disabled={isDisabled.profession}
            />
            <button
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
                className={`icon ${
                  isDisabled.profession ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label>Phone Number</label>
          <div>
            <input
              type="text"
              value={newUserInfo.phoneNumber}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, phoneNumber: e.target.value })
              }
              disabled={isDisabled.phoneNumber}
            />
            <button
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
                className={`icon ${
                  isDisabled.phoneNumber ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label>Email</label>
          <div>
            <input
              type="text"
              value={newUserInfo.email}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, email: e.target.value })
              }
              disabled={isDisabled.email}
            />
            <button
              type="button"
              onClick={(e) => {
                setIsDisabled({ ...isDisabled, email: !isDisabled.email });
                if (isUserInfoChanged("email")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`icon ${
                  isDisabled.email ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
        </form>
      </section>
      <section>
        <div className="d-flex align-items-center gap-3">
          <i className={`bi-telephone-fill ${styles["icon"]}`} />
          <h3>Communication Channel:</h3>
        </div>
        <form className={styles["credentials"]}>
          <label>Discord</label>
          <div>
            <input
              type="text"
              value={newUserInfo.discord}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, discord: e.target.value })
              }
              disabled={isDisabled.discord}
            />
            <button
              type="button"
              onClick={(e) => {
                setIsDisabled({ ...isDisabled, discord: !isDisabled.discord });
                if (isUserInfoChanged("discord")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`icon ${
                  isDisabled.discord ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label>Instagram</label>
          <div>
            <input
              type="text"
              value={newUserInfo.instagram}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, instagram: e.target.value })
              }
              disabled={isDisabled.instagram}
            />
            <button
              type="button"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  instagram: !isDisabled.instagram,
                });
                if (isUserInfoChanged("instagram")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`icon ${
                  isDisabled.instagram ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label>Facebook</label>
          <div>
            <input
              type="text"
              value={newUserInfo.facebook}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, facebook: e.target.value })
              }
              disabled={isDisabled.facebook}
            />
            <button
              type="button"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  facebook: !isDisabled.facebook,
                });
                if (isUserInfoChanged("facebook")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`icon ${
                  isDisabled.facebook ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
          <label>Twitter</label>
          <div>
            <input
              type="text"
              value={newUserInfo.twitter}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, twitter: e.target.value })
              }
              disabled={isDisabled.twitter}
            />
            <button
              type="button"
              onClick={(e) => {
                setIsDisabled({ ...isDisabled, twitter: !isDisabled.twitter });
                if (isUserInfoChanged("twitter")) setUpdateUserInfo(true);
              }}
            >
              <i
                className={`icon ${
                  isDisabled.twitter ? "bi-pencil-square" : "bi-save"
                }`}
              />
            </button>
          </div>
        </form>
      </section>
      <section>
        <h3>Blog Peference</h3>
        <form className={styles["credentials"]}>
          <div>
            <p>{"Communicate via:"}</p>
            <select
              disabled={!shareCommute}
              value={commute}
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
          <div>
            <input
              type="checkbox"
              value={shareCommute}
              onChange={(e) => setShareCommute(!shareCommute)}
            />
            <p>{"Share commmute details with Blog readers"}</p>
          </div>
        </form>
      </section>
    </main>
  );
}

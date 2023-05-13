"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { CacheContext } from "@context/cacheProvider";
import { requestUserInfo, requestUserInfoUpdate } from "./profileHelper";

const Container = styled.div`
  display: grid;
  gap: 1rem;
`;
const BackButton = styled.button`
  min-height: 5rem;
  min-width: 5rem;
`;
const Icon = styled.i`
  font-size: ${({ iconSize }) => iconSize || "2rem"};
`;
const CredentialSection = styled.section``;
const CredentialForm = styled.form`
  display: grid;
  margin: 0rem 1rem;
  padding: 2rem;
  gap: 0.5rem;
  background-color: var(--bs-gray-100);
  border: 0.00625rem solid var(--bs-gray-500);
  border-radius: 0.5rem;
`;

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
  const cacheContext = useContext(CacheContext);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [newUserInfo, setNewUserInfo] = useState(initialUserInfo);
  const [commute, setCommute] = useState("None");
  const [shareCommute, setShareCommute] = useState(false);
  const [updateUserInfo, setUpdateUserInfo] = useState(false);
  const [isDisabled, setIsDisabled] = useState(initialIsDisabled);

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
    if (shareCommute) userData["commute"] = commute;

    requestUserInfoUpdate(cacheContext.cache["token"], userData).then(() =>
      setUserInfo(newUserInfo)
    );
  }, [updateUserInfo]);

  return (
    <Container>
      <div className="d-flex align-items-center gap-1">
        <BackButton className="btn" onClick={() => router.back()}>
          <Icon className="bi-arrow-left" />
        </BackButton>
        <h1>Profile</h1>
      </div>
      <CredentialSection>
        <div className="d-flex align-items-center gap-3">
          <Icon className="bi-person-circle" iconSize="4rem" />
          <h3>Personal Information:</h3>
        </div>
        <CredentialForm>
          <label className="form-label m-0">First Name</label>
          <div className="d-flex align-items-center">
            <input
              className="form-control"
              type="text"
              value={newUserInfo.firstName}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, firstName: e.target.value })
              }
              disabled={isDisabled.firstName}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  firstName: !isDisabled.firstName,
                });
                if (isUserInfoChanged("firstName")) setUpdateUserInfo(true);
              }}
            >
              <Icon
                className={
                  isDisabled.firstName ? "bi-pencil-square" : "bi-save"
                }
                iconSize="2rem"
              />
            </button>
          </div>
          <label className="form-label m-0">Last Name</label>
          <div className="d-flex align-items-center">
            <input
              className="form-control"
              type="text"
              value={newUserInfo.lastName}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, lastName: e.target.value })
              }
              disabled={isDisabled.lastName}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  lastName: !isDisabled.lastName,
                });
                if (isUserInfoChanged("lastName")) setUpdateUserInfo(true);
              }}
            >
              <Icon
                className={isDisabled.lastName ? "bi-pencil-square" : "bi-save"}
                iconSize="2rem"
              />
            </button>
          </div>
          <label className="form-label m-0">Profession</label>
          <div className="d-flex align-items-center">
            <input
              className="form-control"
              type="text"
              value={newUserInfo.profession}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, profession: e.target.value })
              }
              disabled={isDisabled.profession}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  profession: !isDisabled.profession,
                });
                if (isUserInfoChanged("profession")) setUpdateUserInfo(true);
              }}
            >
              <Icon
                className={
                  isDisabled.profession ? "bi-pencil-square" : "bi-save"
                }
                iconSize="2rem"
              />
            </button>
          </div>
          <label className="form-label m-0">Phone Number</label>
          <div className="d-flex align-items-center">
            <input
              className="form-control"
              type="text"
              value={newUserInfo.phoneNumber}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, phoneNumber: e.target.value })
              }
              disabled={isDisabled.phoneNumber}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  phoneNumber: !isDisabled.phoneNumber,
                });
                if (isUserInfoChanged("phoneNumber")) setUpdateUserInfo(true);
              }}
            >
              <Icon
                className={
                  isDisabled.phoneNumber ? "bi-pencil-square" : "bi-save"
                }
                iconSize="2rem"
              />
            </button>
          </div>
          <label className="form-label m-0">Email</label>
          <div className="d-flex align-items-center">
            <input
              className="form-control"
              type="text"
              value={newUserInfo.email}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, email: e.target.value })
              }
              disabled={isDisabled.email}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setIsDisabled({ ...isDisabled, email: !isDisabled.email });
                if (isUserInfoChanged("email")) setUpdateUserInfo(true);
              }}
            >
              <Icon
                className={isDisabled.email ? "bi-pencil-square" : "bi-save"}
                iconSize="2rem"
              />
            </button>
          </div>
        </CredentialForm>
      </CredentialSection>
      <CredentialSection>
        <div className="d-flex align-items-center gap-3">
          <Icon className="bi-telephone-fill" iconSize="4rem" />
          <h3>Communication Channel:</h3>
        </div>
        <CredentialForm>
          <label className="form-label m-0">Discord</label>
          <div className="d-flex align-items-center">
            <input
              className="form-control"
              type="text"
              value={newUserInfo.discord}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, discord: e.target.value })
              }
              disabled={isDisabled.discord}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setIsDisabled({ ...isDisabled, discord: !isDisabled.discord });
                if (isUserInfoChanged("discord")) setUpdateUserInfo(true);
              }}
            >
              <Icon
                className={isDisabled.discord ? "bi-pencil-square" : "bi-save"}
                iconSize="2rem"
              />
            </button>
          </div>
          <label className="form-label m-0">Instagram</label>
          <div className="d-flex align-items-center">
            <input
              className="form-control"
              type="text"
              value={newUserInfo.instagram}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, instagram: e.target.value })
              }
              disabled={isDisabled.instagram}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  instagram: !isDisabled.instagram,
                });
                if (isUserInfoChanged("instagram")) setUpdateUserInfo(true);
              }}
            >
              <Icon
                className={
                  isDisabled.instagram ? "bi-pencil-square" : "bi-save"
                }
                iconSize="2rem"
              />
            </button>
          </div>
          <label className="form-label m-0">Facebook</label>
          <div className="d-flex align-items-center">
            <input
              className="form-control"
              type="text"
              value={newUserInfo.facebook}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, facebook: e.target.value })
              }
              disabled={isDisabled.facebook}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setIsDisabled({
                  ...isDisabled,
                  facebook: !isDisabled.facebook,
                });
                if (isUserInfoChanged("facebook")) setUpdateUserInfo(true);
              }}
            >
              <Icon
                className={isDisabled.facebook ? "bi-pencil-square" : "bi-save"}
                iconSize="2rem"
              />
            </button>
          </div>
          <label className="form-label m-0">Twitter</label>
          <div className="d-flex align-items-center">
            <input
              className="form-control"
              type="text"
              value={newUserInfo.twitter}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, twitter: e.target.value })
              }
              disabled={isDisabled.twitter}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                setIsDisabled({ ...isDisabled, twitter: !isDisabled.twitter });
                if (isUserInfoChanged("twitter")) setUpdateUserInfo(true);
              }}
            >
              <Icon
                className={isDisabled.twitter ? "bi-pencil-square" : "bi-save"}
                iconSize="2rem"
              />
            </button>
          </div>
        </CredentialForm>
      </CredentialSection>
      <CredentialSection>
        <h3>Blog Peference</h3>
        <CredentialForm>
          <div className="d-flex gap-2 align-items-center ">
            <p className="m-0 text-nowrap">{"Communicate via:"}</p>
            <select
              className="form-select"
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
          <div className="d-flex gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={shareCommute}
              onChange={(e) => setShareCommute(!shareCommute)}
            />
            <p>{"Share commmute details with Blog readers"}</p>
          </div>
        </CredentialForm>
      </CredentialSection>
    </Container>
  );
}

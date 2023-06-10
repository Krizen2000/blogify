"use client";

import axios from "axios";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCacheContext } from "@context/cacheProvider";

type Cache = {
  token: string | null;
  name: string | null;
  username: string | null;
  isSubscribed: boolean;
};

type Community = {
  communityId: string;
  creator: string;
  image: string;
  description: string;
  createdAt: string;
};

async function updateCommunity(
  communityId: string,
  data: {
    communityId: string;
    creator: string;
    image: string;
    description: string;
  },
  token: string
) {
  const axisInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    const res = await axisInstance.put(`/api/communities/${communityId}`, data);
    console.log(`PUT/api/communities/${communityId}: `, res.data);
  } catch (err) {
    console.error(err);
  }
}

async function requestCommunity(
  communityId: string
): Promise<Community | null> {
  let community: Community | null = null;
  try {
    const res = await axios.get(`/api/communities/${communityId}`);
    console.log(`GET/api/communities/${communityId}: `, res.data);
    community = res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!community) return null;
  return community;
}

type Props = {
  params: {
    communityId: string;
  };
};
const Page: React.FC<Props> = ({ params: { communityId } }) => {
  const router = useRouter();
  const cacheContext: { cache: Cache } = useCacheContext();
  const [community, setCommunity] = useState<Community | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [creator, setCreator] = useState("");

  const resetAction = () => {
    let condition = confirm(`Confirm changes for Community '${communityId}'?`);
    if (!condition) return;
    setName(community?.communityId ?? "");
    setDesc(community?.description ?? "");
    setImage(community?.image ?? "");
    setCreator(community?.createdAt ?? "");
  };
  const saveAction = () => {
    let condition = confirm(`Confirm changes for Community '${communityId}'?`);
    let ownershipCondition =
      creator !== community?.creator
        ? confirm(
            `Transfer ownership of '${communityId}' from '${community?.creator}' to '${creator}'?`
          )
        : true;
    let token = cacheContext.cache["token"];

    if (!condition || !token) return;
    let data = {
      communityId: name,
      description: desc,
      image,
      creator,
    };
    if (!ownershipCondition) {
      let { creator, ...newData } = data;
      // @ts-ignore "Dynamic nature of the attribute"
      data = newData;
    }
    updateCommunity(communityId, data, token).then(() => {
      alert("Updates applied successfully!");
      router.push("/communities");
    });
  };

  useEffect(() => {
    requestCommunity(communityId).then((requestedCommunity) => {
      if (!requestedCommunity) return;
      setCommunity(requestedCommunity);
      setName(requestedCommunity?.communityId ?? "");
      setDesc(requestedCommunity?.description ?? "");
      setImage(requestedCommunity?.image ?? "");
      setCreator(requestedCommunity?.creator ?? "");
    });
  }, []);

  return (
    <main className={styles["community-editing"]}>
      <img className={styles["image"]} src={community?.image} />
      <div className={styles["community-details"]}>
        <h1>Community Details</h1>
        <p>Name:</p>
        <input
          className={styles["input"]}
          defaultValue={community?.communityId}
          onChange={(e) => setName(e.target.value)}
        />

        <p>Image:</p>
        <input
          className={styles["input"]}
          defaultValue={community?.image}
          onChange={(e) => setImage(e.target.value)}
        />

        <p>Description:</p>
        <input
          className={styles["input"]}
          defaultValue={community?.description}
          onChange={(e) => setDesc(e.target.value)}
        />

        <p>Creator:</p>
        <input
          className={styles["input"]}
          defaultValue={community?.creator}
          onChange={(e) => setCreator(e.target.value)}
        />

        <div className={styles["button-group"]}>
          <button className={styles["secondary-btn"]} onClick={resetAction}>
            <i className="bi-trash" />
            Reset
          </button>
          <button className={styles["primary-btn"]} onClick={saveAction}>
            <i className="bi-pencil" />
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;

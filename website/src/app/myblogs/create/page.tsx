"use client";

import styles from "./style.module.css";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCacheContext } from "@context/cacheProvider";

type Blog = {
  blogId: string;
  image: string;
  description: string;
  title: string;
  tags: string[];
  publisher: string;
  communities: string[];
  viewCount: number;
  likedBy: string[];
};

async function requestBlogCreation(token: string, data: Blog) {
  console.log("requestBlogCreation", data);

  let { blogId, image, description, title, publisher } = data;
  let newData = { blogId, image, description, title, publisher };
  // @ts-ignore "Dynamic nature of the attribute"
  if (data?.tags && true) newData["tags"] = data["tags"];
  // @ts-ignore "Dynamic nature of the attribute"
  if (data?.communities && true) newData["communities"] = data["communities"];

  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    const res = await axiosInstance.post(`/api/blogs/`, data);
    console.log("requestBlogCreation:", res.data);
  } catch (err) {
    console.error(err);
  }
}

// ? IMPLEMENT EXCEPTION FOR DUPLICATE BLOG
export default function CreateBlog() {
  const cacheContext = useCacheContext();
  const [blogId, setBlogId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(Array<string>());
  const [communities, setCommunities] = useState(Array<string>());

  const router = useRouter();

  const tagsListener = (e: ChangeEvent<HTMLInputElement>) => {
    let inputedTags = e.target.value.replace(" ", "").split(",");

    if (typeof inputedTags === "string" && inputedTags === "") return;
    if (typeof inputedTags === "string") inputedTags = [inputedTags];

    setTags(inputedTags);
  };
  const communitiesListener = (e: ChangeEvent<HTMLInputElement>) => {
    let inputedCommunities = e.target.value.replace(" ", "").split(",");

    if (typeof inputedCommunities === "string" && inputedCommunities == "")
      return;
    if (typeof inputedCommunities === "string")
      inputedCommunities = [inputedCommunities];

    setCommunities(inputedCommunities);
  };
  const makeNewBlog = async () => {
    // @ts-expect-error Publisher name in token
    await requestBlogCreation(cacheContext.cache["token"], {
      blogId,
      title,
      image,
      description,
      tags,
      communities,
    });
    router.back();
  };
  return (
    <main className={styles["blog-container"]}>
      <h1 className={styles["header-text"]}>Create Blog</h1>
      <article className={styles["blog-details"]}>
        <label>BlogId</label>
        <input
          className={styles["input"]}
          type="text"
          onChange={(e) => setBlogId(e.target.value)}
        />
        <label>Title</label>
        <input
          className={styles["input"]}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Image</label>
        <input
          className={styles["input"]}
          type="text"
          onChange={(e) => setImage(e.target.value)}
        />
        <label>Description</label>
        <input
          className={styles["input"]}
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Tags</label>
        <input
          className={styles["input"]}
          type="text"
          onChange={tagsListener}
        />
        <label>Communities</label>
        <input
          className={styles["input"]}
          type="text"
          onChange={communitiesListener}
        />
        <div className={styles["button-group"]}>
          <button className={styles["secondary-btn"]} type="reset">
            Clear
          </button>
          <button
            className={styles["primary-btn"]}
            type="button"
            onClick={makeNewBlog}
          >
            Create
          </button>
        </div>
      </article>
    </main>
  );
}

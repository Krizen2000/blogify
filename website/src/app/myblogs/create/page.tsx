"use client";

import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
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

// ! INPUT VALIDATION ON ID
export default function CreateBlog() {
  const cacheContext = useCacheContext();
  const [blogId, setBlogId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags]: [string[], Dispatch<SetStateAction<string[]>>] =
    useState(Array());
  const [communities, setCommunities]: [
    string[],
    Dispatch<SetStateAction<string[]>>
  ] = useState(Array());
  const router = useRouter();
  const makeNewBlog = async () => {
    // @ts-expect-error Publisher name in token
    await requestBlogCreation(cacheContext.cache["token"], {
      blogId,
      title,
      image,
      description,
      tags,
    });
    router.back();
  };
  return (
    <main>
      <div>
        <button onClick={() => router.back()}>
          <i className="bi-arrow-left" />
        </button>
        <h1>Create Blog</h1>
      </div>
      <article>
        <label>BlogId</label>
        <input
          type="text"
          value={blogId}
          onChange={(e) => setBlogId(e.target.value)}
        />
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Image</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Tags</label>
        <input
          type="text"
          defaultValue={tags}
          onChange={(e) => {
            let inputedTags = e.target.value.replace(" ", "").split(",");
            if (typeof inputedTags === "string") inputedTags = [inputedTags];
            setTags(inputedTags);
          }}
        />
        <label>Communities</label>
        <input
          type="text"
          defaultValue={communities}
          onChange={(e) => {
            let inputedCommunities = e.target.value.replace(" ", "").split(",");
            if (typeof inputedCommunities === "string")
              inputedCommunities = [inputedCommunities];
            setCommunities(inputedCommunities);
          }}
        />
        <div>
          <button type="reset">Clear</button>
          <button type="button" onClick={makeNewBlog}>
            Create
          </button>
        </div>
      </article>
    </main>
  );
}

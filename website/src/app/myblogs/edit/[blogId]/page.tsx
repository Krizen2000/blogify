"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCacheContext } from "@context/cacheProvider";
import axios from "axios";

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

async function requestBlogUpdation(
  token: string,
  prevBlogId: string,
  data: {
    blogId: string;
    title: string;
    image: string;
    description: string;
    tags: string[];
  }
) {
  console.log("requestBlogCreation", data);
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    const res = await axiosInstance.put(`/api/myblogs/${prevBlogId}`, data);
    console.log("requestBlogCreation:", res.data);
  } catch (err) {
    console.error(err);
  }
}

async function requestBlogDetails(blogId: string) {
  const axiosInstance = axios.create({});
  let blog = null;
  try {
    const res = await axiosInstance.get(`/api/blogs/find/${blogId}`);
    blog = res.data;
    console.log("requestBlogDetails:", res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
  return blog;
}

type Props = { params: { blogId: string } };

const EditBlog: React.FC<Props> = (props: Props) => {
  const cacheContext = useCacheContext();
  const { blogId: selectedBlogId } = props.params;
  const [blogId, setBlogId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(Array<string>());
  const router = useRouter();
  const updateBlog = () =>
    requestBlogUpdation(cacheContext.cache["token"], selectedBlogId, {
      blogId,
      title,
      image,
      description,
      tags,
    }).then(() => router.back());

  useEffect(() => {
    requestBlogDetails(selectedBlogId).then((blog) => {
      setBlogId(blog.blogId);
      setTitle(blog.title);
      setImage(blog.image);
      setDescription(blog.description);
      setTags(blog.tags);
    });
  }, []);

  return (
    <main>
      <div>
        <div onClick={() => router.back()}>
          <i className="bi-arrow-left" />
        </div>
        <h1>Edit Blog</h1>
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
        <div>
          <button type="reset">Clear</button>
          <button type="button" onClick={updateBlog}>
            Save
          </button>
        </div>
      </article>
    </main>
  );
};

export default EditBlog;

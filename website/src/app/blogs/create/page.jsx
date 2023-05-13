"use client";

import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { CacheContext } from "@context/cacheProvider";

async function requestBlogCreation(token, data) {
  console.log("requestBlogCreation", data);
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  try {
    const res = await axiosInstance.post(`/api/blogs/`, data);
    console.log("requestBlogCreation:", res.data);
  } catch (err) {
    console.error(err);
  }
}

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
const ArticleDetails = styled.form`
  display: grid;
  margin: 0rem 1rem;
  padding: 2rem;
  gap: 0.5rem;
  background-color: var(--bs-gray-100);
  border: 0.00625rem solid var(--bs-gray-500);
  border-radius: 0.5rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function CreateBlog() {
  const cacheContext = useContext(CacheContext);
  const [blogId, setBlogId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const makeNewBlog = async () => {
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
    <Container>
      <div className="d-flex align-items-center gap-1">
        <BackButton className="btn" onClick={() => router.back()}>
          <Icon className="bi-arrow-left" />
        </BackButton>
        <h1>Create Blog</h1>
      </div>
      <ArticleDetails>
        <label className="form-label m-0">BlogId</label>
        <input
          className="form-control"
          type="text"
          value={blogId}
          onChange={(e) => setBlogId(e.target.value)}
        />
        <label className="form-label m-0">Title</label>
        <input
          className="form-control"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="form-label m-0">Image</label>
        <input
          className="form-control"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label className="form-label m-0">Description</label>
        <input
          className="form-control"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="form-label m-0">Tags</label>
        <input
          className="form-control"
          type="text"
          defaultValue={tags}
          onChange={(e) => {
            let inputedTags = e.target.value.replace(" ", "").split(",");
            if (typeof inputedTags === "string") inputedTags = [inputedTags];
            setTags(inputedTags);
          }}
        />
        <ButtonWrapper>
          <button type="reset" className="btn btn-secondary">
            Clear
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={makeNewBlog}
          >
            Create
          </button>
        </ButtonWrapper>
      </ArticleDetails>
    </Container>
  );
}

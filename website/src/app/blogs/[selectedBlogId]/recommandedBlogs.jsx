"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { requestRecentBlogs } from "./blogDetailingHelper";

const Container = styled.section`
  display: grid;
  gap: 2rem;
`;

const Blog = styled.article`
  background-color: var(--bs-gray-100);
  border: 0.125rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 500ms border, 500ms transform;
  :hover {
    border: 0.125rem solid var(--bs-secondary);
    transform: scale(1.1);
  }
  display: grid;
  justify-items: center;
  gap: 1rem;
`;

const Image = styled.img`
  border-radius: 0.5rem 0.5rem 0 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const EmptyBlogList = styled.div`
  display: grid;
  background-color: var(--bs-light-100);
`;

const Icon = styled.i`
  font-size: 5rem;
`;

export default function RecommandedBlogs() {
  const router = useRouter();
  const navigate = (url) => router.push(url);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    requestRecentBlogs().then((blogs) => setBlogList(blogs));
  }, []);

  return (
    <Container>
      {blogList ? (
        blogList.map((blog) => (
          <Blog
            key={blog.blogId}
            onClick={() => {
              navigate(`/blogs/${blog.blogId}`);
              navigate(0);
            }}
          >
            <Image src={blog.image} alt="blogimage" />
            <h5>{blog.title}</h5>
          </Blog>
        ))
      ) : (
        <EmptyBlogList>
          <Icon className="bi-emoji-smile-upside-down"></Icon>
          <p>There will be more contents soon</p>
        </EmptyBlogList>
      )}
    </Container>
  );
}

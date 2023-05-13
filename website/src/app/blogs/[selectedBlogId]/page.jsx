"use client";

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { requestBlogDetails } from "./blogDetailingHelper";
import BlogDetails from "./blogDetails";
import RecommandedBlogs from "./recommandedBlogs";
import { CacheContext } from "@context/cacheProvider";

const Container = styled.div`
  margin: 3rem;
  display: grid;
  gap: 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const initialBlog = { title: "", image: "", description: "", publisher: "" };
export default function BlogDetailing(props) {
  const cacheContext = useContext(CacheContext);
  const { selectedBlogId } = props.params;
  const [blog, setBlog] = useState(initialBlog);

  useEffect(() => {
    requestBlogDetails(cacheContext.cache["token"], selectedBlogId).then(
      (blogData) => setBlog(blogData)
    );
  }, []);

  return (
    <Container>
      <BlogDetails blog={blog} />
      <RecommandedBlogs />
    </Container>
  );
}

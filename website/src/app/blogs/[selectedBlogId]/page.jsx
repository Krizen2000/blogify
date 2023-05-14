"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { requestBlogDetails } from "./blogDetailingHelper";
import BlogDetails from "./blogDetails";
import RecommandedBlogs from "./recommandedBlogs";
import { useCacheContext } from "@context/cacheProvider";

const Container = styled.div`
  margin: 3rem;
  display: grid;
  gap: 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const initialBlog = { title: "", image: "", description: "", publisher: "" };
function useRequestBlogDetails(blogId) {
  const cacheContext = useCacheContext();
  const [blog, setBlog] = useState(initialBlog);

  useEffect(() => {
    requestBlogDetails(cacheContext.cache["token"], blogId).then((blog) =>
      setBlog(blog)
    );
  }, [cacheContext, blogId]);

  return blog;
}

export default function BlogDetailing(props) {
  const { selectedBlogId } = props.params;
  const blog = useRequestBlogDetails(selectedBlogId);

  return (
    <Container>
      <BlogDetails blog={blog} />
      <RecommandedBlogs />
    </Container>
  );
}

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { requestBlogDetails } from "../components/blogDetailing/blogDetailingHelper";
import BlogDetails from "../components/blogDetailing/blogDetails";
import RecommandedBlogs from "../components/blogDetailing/recommandedBlogs";
import { CacheContext } from "../components/cacheProvider";

const Container = styled.div`
  margin: 3rem;
  display: grid;
  gap: 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const initialBlog = { title: "", imageUrl: "", description: "", publisher: "" };
export default function BlogDetailing() {
  const cacheContext = useContext(CacheContext);
  const { selectedBlogId } = useParams();
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

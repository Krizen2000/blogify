"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { CacheContext } from "@context/cacheProvider";
import Blog from "../blog";
import { requestUserBlogs } from "./yourBlogsHelper";

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
const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0rem 2rem;
  padding: 2rem 2rem;
  background-color: var(--bs-gray-100);
  border: 0.00625rem solid var(--bs-gray-500);
  border-radius: 0.5rem;
`;
const BlogDisplay = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 25rem);
`;

export default function YourBlogs() {
  const cacheContext = useContext(CacheContext);
  const [blogList, setBlogList] = useState([]);
  const [filteredBlogList, setFilteredBlogList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const getfilteredBlogs = () =>
    searchText
      ? blogList.filter((blog) =>
          blog.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : blogList;

  useEffect(() => {
    requestUserBlogs(cacheContext.cache["token"]).then((blogs) => {
      setBlogList(blogs);
      setFilteredBlogList(blogs);
    });
  }, []);

  useEffect(() => {
    const blogs = getfilteredBlogs();
    setFilteredBlogList(blogs);
    console.log("New FilteredBlogs:", filteredBlogList);
  }, [searchText]);

  return (
    <Container>
      <div className="d-flex align-items-center">
        <BackButton className="btn" onClick={() => router.back()}>
          <Icon className="bi-arrow-left" />
        </BackButton>
      </div>
      <Wrapper>
        <h3>Your Blogs</h3>
        <div className="d-flex align-content-center gap-2">
          <p className="m-0 align-self-center">Search:</p>
          <input
            className="form-control"
            type="text"
            placeholder="Type a title to search (eg. Great night)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </Wrapper>
      <BlogDisplay>
        {filteredBlogList.map((blog) => (
          <Link
            style={{ all: "unset" }}
            href={`blogs/${blog.blogId}`}
            key={blog.blogId}
          >
            <Blog
              title={blog.title}
              image={blog.image}
              description={blog.description}
              tags={blog.tags}
            />
          </Link>
        ))}
      </BlogDisplay>
    </Container>
  );
}

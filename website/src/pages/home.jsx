import { useEffect, useState } from "react";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import {
  requestAllBlogs,
  requestRecentBlogs,
} from "../components/home/homeHelper";
import Blog from "../components/home/blog";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  gap: 1rem;
`;
const RecentBlogs = styled.div`
  display: grid;
`;
const AllBlogs = styled.div`
  display: grid;
`;
const BlogDisplay = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 25rem);
`;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function Home() {
  const [recentBlogList, setRecentBlogList] = useState([]);
  const [allBlogList, setAllBlogList] = useState([]);

  useEffect(() => {
    requestRecentBlogs().then((blogs) => setRecentBlogList(blogs));
    requestAllBlogs().then((blogs) => setAllBlogList(blogs));
  }, []);

  return (
    <Container>
      <RecentBlogs>
        <h3>Recent Blogs</h3>
        {recentBlogList ? (
          <Carousel responsive={responsive}>
            {recentBlogList.map((blog) => (
              <Link
                to={`/blogs/${blog.blogId}`}
                key={blog.blogId}
                style={{ all: "unset" }}
              >
                <Blog
                  title={blog.title}
                  imageUrl={blog.imageUrl}
                  description={blog.description}
                  tags={blog.tags}
                />
              </Link>
            ))}
          </Carousel>
        ) : null}
      </RecentBlogs>
      <AllBlogs>
        <h3>All Blogs</h3>
        <BlogDisplay>
          {allBlogList.map((blog) => (
            <Link
              to={`/blogs/${blog.blogId}`}
              key={blog.blogId}
              style={{ all: "unset" }}
            >
              <Blog
                title={blog.title}
                imageUrl={blog.imageUrl}
                description={blog.description}
                tags={blog.tags}
              />
            </Link>
          ))}
        </BlogDisplay>
      </AllBlogs>
    </Container>
  );
}

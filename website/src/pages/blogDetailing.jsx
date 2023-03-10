import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CacheContext } from "../components/cacheProvider";

async function requestBlogDetails(token, blogId) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: `bearer ${token}` },
  });
  let blog = null;
  try {
    const res = await axiosInstance.get(`/api/blogs/find/${blogId}`);
    blog = res.data;
  } catch (err) {
    console.error(err);
    return initialBlog;
  }
  return blog;
}

const Container = styled.div`
  display: grid;
  gap: 3rem;
`;
const BackButton = styled.button`
  min-height: 5rem;
  min-width: 5rem;
`;
const Icon = styled.i`
  font-size: ${({ iconSize }) => iconSize || "1rem"};
`;

const initialBlog = { title: "", imageUrl: "", description: "", publisher: "" };
export default function BlogDetailing() {
  const cacheContext = useContext(CacheContext);
  const { selectedBlogId } = useParams();
  const [blog, setBlog] = useState(initialBlog);
  const navigate = useNavigate();

  useEffect(() => {
    requestBlogDetails(cacheContext.cache["token"], selectedBlogId).then(
      (blogData) => setBlog(blogData)
    );
  }, []);

  return (
    <Container>
      <div className="d-flex align-items-center">
        <BackButton className="btn" onClick={() => navigate(-1)}>
          <Icon className="bi-arrow-left" />
        </BackButton>
        <h3>Blog Detailing</h3>
      </div>
      <article className="d-grid justify-content-center">
        <title>{blog.title}</title>
        {/* ! Need to implement tags here */}
        <img
          style={{ minWidth: "50vw" }}
          src={blog.imageUrl}
          alt="Article Visual"
        />
        <desc>{blog.description}</desc>
        <cite>
          <p className="text-nowrap">Published By:</p>
          <p className="text-nowrap">{blog.publisher}</p>
        </cite>
      </article>
    </Container>
  );
}

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CacheContext } from "../components/cacheProvider";
import {
  requestBlogDetails,
  requestBlogUpdation,
} from "../components/editBlog/editBlogHelper";

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

export default function EditBlog() {
  const cacheContext = useContext(CacheContext);
  const { selectedBlogId } = useParams();
  const [blogId, setBlogId] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const updateBlog = () =>
    requestBlogUpdation(cacheContext.cache["token"], selectedBlogId, {
      blogId,
      title,
      imageUrl,
      description,
      tags,
    }).then(() => navigate(-1));

  useEffect(() => {
    requestBlogDetails(selectedBlogId).then((blog) => {
      setBlogId(blog.blogId);
      setTitle(blog.title);
      setImageUrl(blog.imageUrl);
      setDescription(blog.description);
      setTags(blog.tags);
    });
  }, []);

  return (
    <Container>
      <div className="d-flex align-items-center gap-1">
        <BackButton className="btn" onClick={() => navigate(-1)}>
          <Icon className="bi-arrow-left" />
        </BackButton>
        <h1>Edit Blog</h1>
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
        <label className="form-label m-0">ImageUrl</label>
        <input
          className="form-control"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
            onClick={updateBlog}
          >
            Save
          </button>
        </ButtonWrapper>
      </ArticleDetails>
    </Container>
  );
}

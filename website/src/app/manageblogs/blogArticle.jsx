"use client";

import styled from "styled-components";

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

export default function BlogArticle(
  blogId,
  setBlogId,
  title,
  setTitle,
  image,
  setImage,
  description,
  setDescription,
  tags,
  setTags,
  secondaryButton,
  primaryButton
) {
  return (
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
        <button type="button" className="btn btn-primary">
          Create
        </button>
      </ButtonWrapper>
    </ArticleDetails>
  );
}

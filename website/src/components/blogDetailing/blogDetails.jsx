import React from "react";
import styled from "styled-components";

const Container = styled.section`
  background-color: var(--bs-gray-100);
  display: grid;
  align-content: flex-start;
  gap: 2rem;
`;

const Article = styled.article`
  margin: 3rem;
  display: grid;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 64;
  justify-self: center;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const Attribution = styled.cite`
  margin: 2rem;
  display: grid;
  justify-self: end;
`;

export default function BlogDetails({ blog }) {
  return (
    <Container>
      <Article>
        <Title>{blog.title}</Title>
        <Image src={blog.imageUrl} alt="blogimage" />
        <desc>{blog.description}</desc>
      </Article>
      <Attribution>
        <h5>{`Author: ${blog.publisher}`}</h5>
      </Attribution>
    </Container>
  );
}

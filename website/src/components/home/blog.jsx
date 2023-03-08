import styled from "styled-components";

const Container = styled.article`
  display: grid;
  margin: 1rem 2rem;
  background-color: var(--bs-gray-100);
  border: 0.00625rem solid var(--bs-gray-500);
  border-radius: 0.5rem;
`;

const Image = styled.img`
  object-fit: cover;
`;

export default function Blog({ title, imageUrl, description, tags }) {
  return (
    <Container className="card">
      <Image src={imageUrl} alt="Image" className="card-img-top" />
      <div className="card-body">
        <title className="card-title d-flex justify-content-center">
          {title}
        </title>
      </div>
    </Container>
  );
}

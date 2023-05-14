import styled from "styled-components";

const Container = styled.article`
  display: grid;
  margin: 1rem 2rem;
  background-color: var(--bs-gray-100);
  border: 0.25rem solid var(--bs-gray-500);
  border-radius: 0.5rem;
  transition: 500ms;
  transform: scale(10/11);

  :hover {
    transition: 500ms;
    transform: scale(1.1);
    border: 0.25rem solid var(--bs-primary);

    & > div > p {
      font-weight: 600;
    }
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

export default function Blog({ title, image, description, tags }) {
  return (
    <Container className="card">
      <Image src={image} alt="Image" className="card-img-top" />
      <div className="card-body">
        <p className="card-title d-flex justify-content-center">{title}</p>
      </div>
    </Container>
  );
}

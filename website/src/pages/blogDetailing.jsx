import styled from "styled-components";

const Container = styled.article`
  display: grid;
  gap: 1rem;
`;

export default function BlogDetailing({
  title,
  imageUrl,
  description,
  tags,
  publisher,
}) {
  return (
    <Container>
      <title>{title}</title>
      {/* ! Need to implement tags here */}
      <img src={imageUrl} alt="Article Visual" />
      <desc>{description}</desc>
      <cite>
        <p className="text-nowrap">Published By:</p>
        <p className="text-nowrap">{publisher}</p>
      </cite>
    </Container>
  );
}

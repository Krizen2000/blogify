import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CacheContext } from "../components/cacheProvider";

async function requestUserSignup(firstName, lastName, phoneNumber, email) {
  const dataPacket = { firstName, lastName, phoneNumber, email };
  const axiosInstance = axios.create({ baseURL: process.env.API_URL });

  let res = null;
  try {
    res = await axiosInstance.post(`/api/signup`, dataPacket);
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!res.data.token) {
    console.error(res);
    return null;
  }
  const name = [firstName, lastName].join(" ");
  return [res.data.token, name];
}

const Container = styled.section`
  display: grid;
  gap: 1rem;
`;
const Button = styled.button`
  min-height: 5rem;
  min-width: 5rem;
`;
const Icon = styled.i`
  font-size: 2rem;
`;
const CredentialForm = styled.form`
  display: grid;
  margin: 0rem 1rem;
  padding: 2rem;
  background-color: var(--bs-gray-100);
  border: 0.00625rem solid var(--bs-gray-500);
  border-radius: 0.5rem;
`;
const ButtonWrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0rem 1rem;
  grid-template-columns: repeat(2, 1fr);
`;

export default function SignUp() {
  const cacheContext = useContext(CacheContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button className="btn" onClick={() => navigate(-1)}>
          <Icon className="bi-arrow-left" />
        </Button>
        <h1>Sign Up</h1>
      </div>
      <CredentialForm>
        <label className="form-label">First Name</label>
        <input
          className="form-control"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="form-label">Last Name</label>
        <input
          className="form-control"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="form-label">Phone Number</label>
        <input
          className="form-control"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </CredentialForm>
      <NavLink style={{ justifySelf: "center" }} to="/login">
        Already a user? Login
      </NavLink>
      <ButtonWrapper>
        <button
          type="reset"
          className="btn btn-secondary"
          onClick={() => {
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setEmail("");
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onSubmit={() => {
            const [token, name] = requestUserSignup(
              firstName,
              lastName,
              phoneNumber,
              email
            );
            if (!token) return;
            cacheContext.setCache({ ...cacheContext.cache, token, name });
            navigate(-1);
          }}
        >
          Create an account
        </button>
      </ButtonWrapper>
    </Container>
  );
}

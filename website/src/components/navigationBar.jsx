import React from "react";
import LogoIcon from "../logo.svg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = styled.nav`
  display: flex;
  padding: 1.5rem;
  background-color: var(--bs-secondary);
`;
const NavBrand = styled.a`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 1rem;
  color: var(--bs-white);
  text-decoration-line: none;
  cursor: pointer;
  :hover {
    color: var(--bs-white);
  }
`;
const Logo = styled.img`
  height: 3.5rem;
  width: 3.5rem;
`;
const NavCollapse = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  justify-content: center;
  gap: 1rem;
  input {
    max-width: 20rem;
  }
`;
const Nav = styled.ul`
  display: flex;
  gap: 1rem;
  margin: 0;
`;
const NavItem = styled.li`
  list-style-type: none;
  a {
    :hover {
      transition: 250ms ease;
      color: var(--bs-white);
    }
  }
`;

export default function NavigationBar() {
  return (
    <NavBar className="navbar navbar-expand-lg">
      <NavBrand className="navbar-brand">
        <NavLink className="nav-link" to="/">
          <Logo src={LogoIcon} color="blue" /> Blogify
        </NavLink>
      </NavBrand>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <NavCollapse className="collapse navbar-collapse" id="navbarContent">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi-search" />
          </span>
          <input className="form-control" />
        </div>
        <Nav className="navbar-nav">
          <NavItem className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink className="nav-link" to="/signup">
              Signup
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </NavItem>
        </Nav>
      </NavCollapse>
    </NavBar>
  );
}

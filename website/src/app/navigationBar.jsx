"use client";

import React, { useContext } from "react";
import LogoIcon from "./logo.svg";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { CacheContext } from "@context/cacheProvider";

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
  display: grid;
  justify-content: center;
  list-style-type: none;
  a {
    white-space: nowrap;
    :hover {
      transition: 250ms ease;
      color: var(--bs-white);
    }
  }
`;

export default function NavigationBar() {
  const cacheContext = useContext(CacheContext);
  const isLoggedIn = cacheContext.cache["name"] ? true : false;
  return (
    <NavBar className="navbar navbar-expand-lg">
      <NavBrand className="navbar-brand">
        <Link className="nav-link" href="/">
          <Image
            style={{ maxHeight: "3.5rem", maxWidth: "3.5rem" }}
            src={LogoIcon}
          />{" "}
          Blogify
        </Link>
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
            <Link className="nav-link" href="/">
              Home
            </Link>
          </NavItem>

          {isLoggedIn ? (
            <>
              <NavItem className="nav-item">
                <Link className="nav-link" href="/profile">
                  Profile
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link className="nav-link" href="/blogs">
                  Your Blogs
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link className="nav-link" href="/manageblogs">
                  Manage Blogs
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link className="nav-link" href="/blogs/create">
                  Create Blogs
                </Link>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem className="nav-item">
                <Link className="nav-link" href="/signup">
                  Signup
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link className="nav-link" href="/login">
                  Login
                </Link>
              </NavItem>
            </>
          )}
        </Nav>
      </NavCollapse>
    </NavBar>
  );
}

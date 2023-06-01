"use client";

import styles from "./navigationBar.module.css";
import LogoIcon from "@image/logo.svg";
import Image from "next/image";
import Link from "next/link";
import useCheckLoggedIn from "./useCheckLoggedIn";
import { useRef } from "react";

const NavigationBar: React.FC = () => {
  const isLoggedIn = useCheckLoggedIn();
  const hamburgerIcon = useRef<HTMLElement>(null);
  const closeIcon = useRef<HTMLElement>(null);
  const navWrapper = useRef<HTMLElement>(null);

  const toggleNavVisibility = () => {
    navWrapper.current?.toggleAttribute("data-visible");
    hamburgerIcon.current?.toggleAttribute("icon-visible");
    closeIcon.current?.toggleAttribute("icon-visible");
  };

  return (
    <div className={styles["navigation-container"]}>
      <Link href="/" className={styles["logo-container"]}>
        <Image
          className={styles["logo-icon"]}
          src={LogoIcon}
          alt="blogify-logo"
        />
        <p className={styles["logo-name"]}>Blogify</p>
      </Link>
      <button className={styles["nav-toggle"]} onClick={toggleNavVisibility}>
        <i
          ref={hamburgerIcon}
          className={`bi-list ${styles["icon-hamburger"]}`}
        />
        <i ref={closeIcon} className={`bi-x ${styles["icon-close"]}`} />
      </button>
      <nav ref={navWrapper} className={styles["navigation-wrapper"]}>
        <ul className={styles["navigation-list"]}>
          <li className={styles["navigation-item"]}>
            <Link className={styles["link"]} href="/">
              Home
            </Link>
          </li>
          <li className={styles["navigation-item"]}>
            <Link className={styles["link"]} href="/blogs">
              Blogs
            </Link>
          </li>
          <li className={styles["navigation-item"]}>
            <Link className={styles["link"]} href="/pricing">
              Pricing
            </Link>
          </li>
          <li className={styles["navigation-item"]}>
            <Link className={styles["link"]} href="/communities">
              Communities
            </Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li className={styles["navigation-item"]}>
                <Link className={styles["link"]} href="/signup">
                  Signup
                </Link>
              </li>
              <li className={styles["navigation-item"]}>
                <Link className={styles["link"]} href="/login">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles["navigation-item"]}>
                <Link className={styles["link"]} href="/myblogs">
                  My Blogs
                </Link>
              </li>
              <li className={styles["navigation-item"]}>
                <Link className={styles["link"]} href="/profile">
                  Profile
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;

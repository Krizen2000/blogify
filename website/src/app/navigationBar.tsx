"use client";

import styles from "./navigationBar.module.css";
import LogoIcon from "@image/logo.svg";
import Image from "next/image";
import Link from "next/link";
import useCheckLoggedIn from "./useCheckLoggedIn";

const NavigationBar: React.FC = () => {
  const isLoggedIn = useCheckLoggedIn();
  return (
    <div className={styles["navigation-container"]}>
      <div className={styles["logo-container"]}>
        <Image
          className={styles["logo-icon"]}
          src={LogoIcon}
          alt="blogify-logo"
        />
        <p className={styles["logo-name"]}>Blogify</p>
      </div>
      <button
        className={styles["nav-toggle"]}
        aria-controls="primary-navigation"
      >
        <i className={`bi-list ${styles["icon-hamburger"]}`} />
        <i className={`bi-x ${styles["icon-close"]}`} />
        <span className={styles["visually-hidden"]}>Menu</span>
      </button>
      <nav className={styles["navigation-wrapper"]}>
        <ul className={styles["navigation-list"]} id="primary-navigation">
          <li className={styles["navigation-item"]}>
            <Link href="/" />
            Home
          </li>
          <li className={styles["navigation-item"]}>
            <Link href="/blogs" />
            Blogs
          </li>
          <li className={styles["navigation-item"]}>
            <Link href="/pricing" />
            Pricing
          </li>
          <li className={styles["navigation-item"]}>
            <Link href="/communities" />
            Communities
          </li>

          <li className={styles["navigation-item"]}>
            <Link href="/signup" />
            Signup
          </li>
          <li className={styles["navigation-item"]}>
            <Link href="/login" />
            Login
          </li>
          <li className={styles["navigation-item"]}>
            <Link href="/profile" />
            Profile
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;

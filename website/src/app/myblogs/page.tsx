"use client";

import { MouseEvent, useRef, useState } from "react";
import styles from "./styles.module.css";
import MostLiked from "./mostLiked";
import MostViewed from "./mostViewed";
import Link from "next/link";

const MyBlogs: React.FC = () => {
  const [category, setCategory] = useState("views");
  const mostViewedBtn = useRef<HTMLButtonElement>(null);
  const mostLikedBtn = useRef<HTMLButtonElement>(null);
  const viewBtnAction = (e: MouseEvent<HTMLButtonElement>) => {
    if (category === "views") return;
    setCategory("views");
    if (!mostViewedBtn.current) return;
    mostViewedBtn.current.style.borderColor = "var(--clr-primary-rgb)";
    mostViewedBtn.current.style.color = "var(--clr-primary-rgb)";
    if (!mostLikedBtn.current) return;
    mostLikedBtn.current.style.borderColor = "var(--clr-txt-rgb)";
    mostLikedBtn.current.style.color = "var(--clr-txt-rgb)";
  };
  const likesBtnAction = (e: MouseEvent<HTMLButtonElement>) => {
    if (category === "likes") return;
    setCategory("likes");

    if (!mostLikedBtn.current) return;
    mostLikedBtn.current.style.borderColor = "var(--clr-primary-rgb)";
    mostLikedBtn.current.style.color = "var(--clr-primary-rgb)";
    if (!mostViewedBtn.current) return;
    mostViewedBtn.current.style.borderColor = "var(--clr-txt-rgb)";
    mostViewedBtn.current.style.color = "var(--clr-txt-rgb)";
  };
  return (
    <main className={styles["myblogs-container"]}>
      <section className={styles["blogs-container"]}>
        <h2 className={styles["header-text"]}>Your Blogs</h2>
        <a
          role="button"
          href="/myblogs/create"
          className={styles["create-btn-mob"]}
        >
          Create Blog
        </a>
        <div className={styles["action-group"]}>
          <button
            ref={mostViewedBtn}
            className={styles["btn"]}
            onClick={viewBtnAction}
          >
            Most Viewed
          </button>
          <button
            ref={mostLikedBtn}
            className={styles["btn"]}
            onClick={likesBtnAction}
          >
            Most Liked
          </button>
          <Link
            role="button"
            href="/myblogs/create"
            className={styles["create-btn"]}
          >
            <i className={`bi-plus ${styles["create-icon"]}`} />
          </Link>
        </div>
        {category === "views" ? <MostViewed /> : <MostLiked />}
      </section>
    </main>
  );
};

export default MyBlogs;

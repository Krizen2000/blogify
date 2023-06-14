"use client";

import { MouseEvent, useState } from "react";
import styles from "./styles.module.css";
import MostLiked from "./mostLiked";
import MostViewed from "./mostViewed";
import Link from "next/link";

const MyBlogs: React.FC = () => {
  const [category, setCategory] = useState("views");
  const viewBtnAction = (e: MouseEvent<HTMLOptionElement>) =>
    setCategory("views");
  const likesBtnAction = (e: MouseEvent<HTMLOptionElement>) =>
    setCategory("likes");
  return (
    <main className={styles["myblogs-container"]}>
      <section className={styles["blogs-container"]}>
        <h2 className={styles["header-text"]}>Your Blogs</h2>
        <div className={styles["action-group"]}>
          <select className={styles["select"]} multiple>
            <option
              selected
              className={styles["option"]}
              onClick={viewBtnAction}
            >
              Most Viewed
            </option>
            <option className={styles["option"]} onClick={likesBtnAction}>
              Most Liked
            </option>
          </select>
          <Link
            role="button"
            href="/myblogs/create"
            className={styles["create-btn"]}
          >
            <i className={`bi-plus ${styles["create-icon"]}`} />
          </Link>
        </div>
        <div>{category === "views" ? <MostViewed /> : <MostLiked />}</div>
      </section>
    </main>
  );
};

export default MyBlogs;

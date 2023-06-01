"use client";

import { MouseEvent, useState } from "react";
import styles from "./styles.module.css";
import MostLiked from "./mostLiked";
import MostViewed from "./mostViewed";
import Link from "next/link";

const MyBlogs: React.FC = () => {
  const [category, setCategory] = useState("views");
  const viewBtnAction = (e: MouseEvent<HTMLButtonElement>) =>
    setCategory("views");
  const likesBtnAction = (e: MouseEvent<HTMLButtonElement>) =>
    setCategory("likes");
  return (
    <main className={styles["myblogs-container"]}>
      <Link role="button" href="/myblogs/create">
        Create Blog
      </Link>
      <section>
        <div>
          <button onClick={viewBtnAction}>Most Viewed</button>
          <button onClick={likesBtnAction}>Most Liked</button>
        </div>
        <div>{category === "views" ? <MostViewed /> : <MostLiked />}</div>
      </section>
    </main>
  );
};

export default MyBlogs;

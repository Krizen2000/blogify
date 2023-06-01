"use client";

import styles from "./blogArray.module.css";
import { useCacheContext } from "@context/cacheProvider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  blogId: string;
  image: string;
  description: string;
  title: string;
  tags: string[];
  publisher: string;
  communities: string[];
  viewCount: number;
  likedBy: string[];
};

async function requestUserBlogs(username: string): Promise<Blog[] | null> {
  let blogs: Blog[] | null = null;
  try {
    const res = await axios.get("/api/myblogs", {
      params: { publisher: username },
    });
    blogs = res.data.blogs;
  } catch (e) {
    console.error(e);
  }
  return blogs;
}

function useRequestMostLiked(): Blog[] {
  const cacheContext = useCacheContext();
  const username = cacheContext.cache["username"];
  const [blogs, setblogs] = useState(Array<Blog>());

  useEffect(() => {
    requestUserBlogs(username).then((requestedBlogs) => {
      if (!requestedBlogs) return;

      const sortedBlogs = requestedBlogs.sort(
        (curr, next) => curr.likedBy.length - next.likedBy.length
      );
      setblogs(requestedBlogs);
    });
  }, []);

  return blogs;
}

const MostLiked: React.FC = () => {
  const blogs = useRequestMostLiked();
  return (
    <section>
      <p>Most Liked</p>
      {blogs ? (
        <ul id="blogs" className={styles["carousel-container"]}>
          {blogs.map((blog) => (
            <li id={blog.blogId} className={styles["carousel-item"]}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                href={`/blogs/${blog.blogId}`}
              >
                <article className={styles["card"]}>
                  <img
                    className={styles["card-image"]}
                    src={blog.image}
                    alt="Blog Image"
                  />
                  <div className={styles["author-details"]}>
                    <header className={styles["article-title"]}>
                      {blog.title}
                    </header>
                    <p className={styles["author-title"]}>Author</p>
                    <span className={styles["article-author"]}>
                      {blog.publisher}
                    </span>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default MostLiked;

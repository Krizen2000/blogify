"use client";

import { useEffect, useState } from "react";
import styles from "./searchField.module.css";
import Link from "next/link";
import axios from "axios";

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

async function requestAllBlogs(): Promise<Blog[] | null> {
  let blogs: Blog[] | null = null;
  try {
    const res = await axios.get("/api/blogs");
    blogs = res.data.blogs;
  } catch (err) {
    console.error(err);
  }
  if (!blogs) return null;
  return blogs;
}

const SearchField: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [blogs, setBlogs] = useState(Array<Blog>());
  const [filteredBlogs, setFilteredBlogs] = useState(Array<Blog>());
  const [displayBlogs, setDisplayBlogs] = useState<number>(3);
  const displayFilter = (blog: Blog, inx: number) => {
    if (inx >= displayBlogs) return false;
    return true;
  };

  const moreBtnAction = () =>
    setDisplayBlogs((displayBlogs) => displayBlogs + 3);

  useEffect(() => {
    requestAllBlogs().then((requestedBlogs) => {
      if (!requestedBlogs) return;
      setBlogs(requestedBlogs);
    });
  }, []);
  useEffect(() => {
    const blogList = blogs
      .filter(
        (blog) =>
          blog.title.toLowerCase().startsWith(searchText.toLowerCase()) ||
          blog.publisher.toLowerCase().startsWith(searchText.toLowerCase()) ||
          blog.communities
            .filter((community) =>
              community.toLowerCase().startsWith(searchText.toLowerCase())
            )
            .reduce(
              (prev: boolean, curr: string) =>
                prev || curr.toLowerCase().startsWith(searchText.toLowerCase()),
              false
            ) ||
          blog.tags
            .filter((tag) =>
              tag.toLowerCase().startsWith(searchText.toLowerCase())
            )
            .reduce(
              (prev: boolean, curr: string) =>
                prev || curr.toLowerCase().startsWith(searchText.toLowerCase()),
              false
            )
      )
      .filter(displayFilter);
    setFilteredBlogs(blogList);
  }, [searchText, displayBlogs]);

  return (
    <div className={styles["search-field"]}>
      <div className={styles["input-group"]}>
        <input
          type="text"
          className={styles["search-bar"]}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <i className={`bi-search ${styles["icon"]}`} />
      </div>
      {filteredBlogs && searchText ? (
        <ul id="blogs" className={styles["carousel-container"]}>
          {filteredBlogs.map((blog) => (
            <li id={blog.blogId} className={styles["carousel-item"]}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                href={`/blogs/${blog.blogId}`}
              >
                <article className={styles["card"]}>
                  <img className={styles["card-image"]} src={blog.image} />
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
      {filteredBlogs.length > displayBlogs && searchText ? (
        <button onClick={moreBtnAction}>
          <i className="bi-arrow-down" />
          See more
        </button>
      ) : null}
    </div>
  );
};

export default SearchField;

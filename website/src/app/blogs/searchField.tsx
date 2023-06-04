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

const tmpBlogs = [
  {
    blogId: "rem",
    image: "rem+",
    description: "Who is?",
    title: "REM",
    tags: [],
    publisher: "remoru",
    communities: [],
    viewCount: 0,
    likedBy: [],
  },
  {
    blogId: "ram",
    image: "ram+",
    description: "Who is?",
    title: "RAM",
    tags: [],
    publisher: "ramoru",
    communities: [],
    viewCount: 0,
    likedBy: [],
  },
  {
    blogId: "rem",
    image: "rem+",
    description: "Who is?",
    title: "REM",
    tags: [],
    publisher: "remoru",
    communities: [],
    viewCount: 0,
    likedBy: [],
  },
  {
    blogId: "ram",
    image: "ram+",
    description: "Who is?",
    title: "RAM",
    tags: [],
    publisher: "ramoru",
    communities: [],
    viewCount: 0,
    likedBy: [],
  },
  {
    blogId: "ram",
    image: "ram+",
    description: "Who is?",
    title: "RAM",
    tags: [],
    publisher: "ramoru",
    communities: [],
    viewCount: 0,
    likedBy: [],
  },
  {
    blogId: "ram",
    image: "ram+",
    description: "Who is?",
    title: "RAM",
    tags: [],
    publisher: "remoru",
    communities: [],
    viewCount: 0,
    likedBy: [],
  },
];

// ! SEARCH FUNCTIONS WORKS ONLY WITH STARTING LETTERS OF TITLE OF BLOGS
// ! MORE BUTTON AND NO. OF CONTENT ADJUST NEEDS TO BE IMPLEMENTED
const SearchField: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  //   const blogs = tmpBlogs;
  const [blogs, setBlogs] = useState(Array<Blog>());
  useEffect(() => {
    requestAllBlogs().then((requestedBlogs) => {
      if (!requestedBlogs) return;
      setBlogs(requestedBlogs);
    });
  }, []);
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
      {blogs && searchText ? (
        <ul id="blogs" className={styles["carousel-container"]}>
          {blogs
            .filter((blog) => blog.title.startsWith(searchText))
            .map((blog) => (
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
    </div>
  );
};

export default SearchField;

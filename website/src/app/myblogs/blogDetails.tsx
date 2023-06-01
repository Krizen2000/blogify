import React from "react";
import styles from "./blogDetails.module.css";

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
type props = {
  blog: Blog;
};

const BlogDetails = (props: props) => {
  const blog = props.blog;
  return (
    <section className={styles["blog-detailing"]}>
      <article className={styles["blog"]}>
        <h1 className={styles["title"]}>{blog.title}</h1>
        <img className={styles["image"]} src={blog.image} alt="blogimage" />
        <desc>{blog.description}</desc>
      </article>
      <cite className={styles["attribution"]}>
        <h5>{`Author: ${blog.publisher}`}</h5>
      </cite>
    </section>
  );
};

export default BlogDetails;

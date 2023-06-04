import React from "react";
import styles from "./blogDetails.module.css";
import InteractionBox from "./interactionBox";
import CommentSection from "./commentSection";

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

const BlogDetails: React.FC<props> = ({ blog }) => {
  return (
    <section className={styles["blog-group"]}>
      <div className={styles["blog-detailing"]}>
        <article className={styles["blog"]}>
          <h1 className={styles["title"]}>{blog.title}</h1>
          <img className={styles["image"]} src={blog.image} alt="blogimage" />
          <desc>{blog.description}</desc>
        </article>
        <cite className={styles["attribution"]}>
          <h5>{`Author: ${blog.publisher}`}</h5>
        </cite>
      </div>
      <InteractionBox blog={blog} />
      <CommentSection blogId={blog.blogId} />
    </section>
  );
};

export default BlogDetails;

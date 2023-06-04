"use client";
import axios from "axios";
import styles from "./commentSection.module.css";
import { useEffect, useState } from "react";

type Comment = {
  username: string;
  blogId: string;
  title: string;
  message: string;
};

async function requestBlogComments(blogId: string): Promise<Comment[] | null> {
  let comments: Comment[] | null = null;
  try {
    const res = await axios.get(`/api/comments/search?blogId=${blogId}`);
    comments = res.data?.comments ?? null;
  } catch (err) {
    console.log(err);
  }
  return comments;
}

const staticComments = [
  {
    username: "Billy",
    blogId: "blublo",
    title: "Hello Billy",
    message:
      "Sunt magna excepteur aliquip officia est pariatur anim ad in irure. Adipisicing tempor aliquip id velit magna elit ea ipsum do adipisicing nisi dolor nulla. Ullamco incididunt adipisicing dolor anim fugiat. Reprehenderit sit exercitation veniam cupidatat ex nostrud labore laboris elit ex dolore magna. Culpa id fugiat non id elit officia eu ex eiusmod occaecat. Magna eu cillum id id et sunt voluptate irure velit sint do.",
  },
  {
    username: "Juan",
    blogId: "jauana",
    title: "Hello Juan",
    message:
      "Laborum ad consequat nisi et enim duis eiusmod qui magna. Reprehenderit cillum voluptate cupidatat id non eiusmod in irure. Quis do laboris elit qui commodo adipisicing.",
  },
];

const CommentSection: React.FC<{ blogId: string }> = ({ blogId }) => {
  let [comments, setComments] = useState(Array<Comment>());
  useEffect(() => {
    requestBlogComments(blogId).then((requestedComments) => {
      if (!requestedComments) return;
      setComments(requestedComments);
    });
  }, []);
  return (
    <div className={styles["comment-section"]}>
      <h3 className={styles["comment-title"]}>Comments</h3>
      <div className={styles["comment-list"]}>
        {comments.map((comment, inx) => (
          <>
            <div className={styles["comment"]}>
              <p className={styles["username"]}>{comment.username}</p>
              <p className={styles["title"]}>{comment.title}</p>
              <span className={styles["message"]}>{comment.message}</span>
            </div>
            {comments.length > 1 && inx + 1 !== comments.length ? (
              <hr className={styles["seperator"]} />
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

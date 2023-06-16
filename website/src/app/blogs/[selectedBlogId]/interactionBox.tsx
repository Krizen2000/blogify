"use client";
import {
  Dispatch,
  SetStateAction,
  useDebugValue,
  useEffect,
  useState,
} from "react";
import styles from "./interactionBox.module.css";
import { useCacheContext } from "@context/cacheProvider";
import axios from "axios";
import { useRouter } from "next/navigation";

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
type Cache = {
  token: string | null;
  name: string | null;
  username: string | null;
  isSubscribed: boolean;
};

function useCheckUserLiked(blog: Blog) {
  const [userLiked, setUserLiked] = useState(false);
  const cacheContext: { cache: Cache } = useCacheContext();
  useDebugValue(userLiked);
  useEffect(() => {
    let username = cacheContext.cache["username"];
    if (!username) return;
    if (blog.likedBy.indexOf(username) == -1) return;

    setUserLiked(true);
  }, [cacheContext]);
  return { userLiked, setUserLiked };
}

function useCheckUserLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  const cacheContext: { cache: Cache } = useCacheContext();
  useDebugValue(loggedIn);
  useEffect(() => {
    let username = cacheContext.cache["username"];
    if (!username) return;
    setLoggedIn(true);
  }, [cacheContext]);
  return loggedIn;
}

async function uploadPublisherComment(
  title: string,
  message: string,
  blogId: string,
  token: string
) {
  const data = { title, message, blogId, token };
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  axiosInstance
    .post("/api/comments", data)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
}

async function likePublisherBlog(
  blogId: string,
  token: string,
  setUserLiked: Dispatch<SetStateAction<boolean>>
) {
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  axiosInstance
    .put(`/api/blogs/like/${blogId}`)
    .then((res) => setUserLiked(true))
    .catch((err) => console.log(err));
}

async function dislikePublisherBlog(
  blogId: string,
  token: string,
  setUserLiked: Dispatch<SetStateAction<boolean>>
) {
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  axiosInstance
    .put(`/api/blogs/dislike/${blogId}`)
    .then((res) => setUserLiked(false))
    .catch((err) => console.log(err));
}

const InteractionBox: React.FC<props> = ({ blog }) => {
  const userLoggedIn = useCheckUserLoggedIn();
  const { userLiked, setUserLiked } = useCheckUserLiked(blog);
  const cacheContext: { cache: Cache } = useCacheContext();
  const router = useRouter();
  const token = cacheContext.cache["token"];

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
      {userLoggedIn ? (
        <div className={styles["interaction-box"]}>
          <div className={styles["likes-group"]}>
            <span className={styles["no-of-likes"]}>{blog.likedBy.length}</span>
            {userLiked ? (
              <button
                className={styles["btn"]}
                onClick={() => {
                  if (!token) return;
                  dislikePublisherBlog(blog.blogId, token, setUserLiked);
                  router.refresh();
                }}
              >
                <i className={`bi-heart-fill ${styles["icon"]}`} />
              </button>
            ) : (
              <button
                className={styles["btn"]}
                onClick={() => {
                  if (!token) return;
                  likePublisherBlog(blog.blogId, token, setUserLiked).then(() =>
                    router.refresh()
                  );
                }}
              >
                <i className={`bi-heart ${styles["icon"]}`} />
              </button>
            )}
          </div>
          <div className={styles["input-grp"]}>
            <div className={styles["comment-box"]}>
              <p>Title:</p>
              <input
                className={styles["input"]}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p>Comment:</p>
              <textarea
                className={styles["textarea"]}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              className={styles["send-btn"]}
              onClick={() => {
                if (!token) return;
                uploadPublisherComment(title, message, blog.blogId, token).then(
                  () => router.refresh()
                );
              }}
            >
              <i className={`bi-send ${styles["icon"]}`} />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default InteractionBox;

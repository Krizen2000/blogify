"use client";

import styles from "./blogArray.module.css";
import { useCacheContext } from "@context/cacheProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
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
async function deleteUserBlog(blogId: string, token: string) {
  try {
    const axiosInstance = axios.create({
      headers: { Authorization: `bearer ${token}` },
    });
    await axiosInstance.delete(`/api/myblogs/${blogId}`);
  } catch (e) {
    console.error(e);
  }
}

function useGetToken(): string {
  const cacheContext = useCacheContext();
  return cacheContext.cache["token"];
}
function useRequestMostLiked(): Blog[] {
  const cacheContext = useCacheContext();
  const [blogs, setblogs] = useState(Array<Blog>());

  useEffect(() => {
    requestUserBlogs(cacheContext.cache["username"]).then((requestedBlogs) => {
      if (!requestedBlogs) return;

      const sortedBlogs = requestedBlogs.sort(
        (curr, next) => curr.likedBy.length - next.likedBy.length
      );
      setblogs(requestedBlogs);
    });
  }, [cacheContext]);

  return blogs;
}

const MostLiked: React.FC = () => {
  const blogs = useRequestMostLiked();
  const token = useGetToken();
  const router = useRouter();
  const [actionName, setActionName] = useState("view");
  const actionRunner = (blogId: string, actionName: string) => {
    switch (actionName) {
      case "view":
        router.push(`/blogs/${blogId}`);
        break;
      case "edit":
        router.push(`/myblogs/edit/${blogId}`);
        break;
      case "delete":
        const decision = confirm(
          `Are you sure you want to delete '${blogId}'?`
        );
        if (!decision) return;
        deleteUserBlog(blogId, token).then(() => {
          alert(`Deleted Blog with ID '${blogId}'`);
          router.refresh();
        });
        break;
      default:
        break;
    }
  };
  return (
    <section>
      <p>Most Liked</p>
      {blogs ? (
        <ul id="blogs" className={styles["carousel-container"]}>
          {blogs.map((blog) => (
            <li id={blog.blogId} className={styles["carousel-item"]}>
              <article className={styles["card"]}>
                <img className={styles["card-image"]} src={blog.image} />
                <div className={styles["author-details"]}>
                  <p className={styles["title-header"]}>Title</p>
                  <header className={styles["article-title"]}>
                    {blog.title}
                  </header>
                  <div className={styles["action-container"]}>
                    <select
                      defaultValue={actionName}
                      onChange={(e) => setActionName(e.target.value)}
                    >
                      <option value="view">view</option>
                      <option value="edit">edit</option>
                      <option value="delete">delete</option>
                    </select>
                    <button
                      onClick={() => actionRunner(blog.blogId, actionName)}
                    >
                      <i className="bi-play-fill" />
                    </button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default MostLiked;

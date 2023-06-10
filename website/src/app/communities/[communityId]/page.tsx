"use client";

import axios from "axios";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCacheContext } from "@context/cacheProvider";
import { useRouter } from "next/navigation";

type Community = {
  communityId: string;
  creator: string;
  image: string;
  description: string;
  createdAt: string;
};

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

async function requestCommunity(
  communityId: string
): Promise<Community | null> {
  let community: Community | null = null;
  try {
    const res = await axios.get(`/api/communities/${communityId}`);
    console.log(`GET/api/communities/${communityId}: `, res.data);
    community = res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!community) return null;
  return community;
}

async function deleteCommunity(
  communityId: string,
  token: string
): Promise<Community | null> {
  const axiosInstance = axios.create({
    headers: { Authorization: `bearer ${token}` },
  });
  let community: Community | null = null;
  try {
    const res = await axiosInstance.delete(`/api/communities/${communityId}`);
    console.log(`DELETE/api/communities/${communityId}: `, res.data);
    community = res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!community) return null;
  return community;
}

async function requestAllBlogs(): Promise<Blog[] | null> {
  let blogs: Blog[] | null = null;
  try {
    const res = await axios.get("/api/blogs");
    blogs = res.data.blogs;
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!blogs) return null;
  return blogs;
}

type Props = {
  params: {
    communityId: string;
  };
};
const Page: React.FC<Props> = ({ params: { communityId } }) => {
  const router = useRouter();
  const cacheContext = useCacheContext();
  const [username, setUsername] = useState("");
  const [community, setCommunity] = useState<Community | null>(null);
  const [blogs, setBlogs] = useState(Array<Blog>());
  const [filteredBlogs, setFilteredBlogs] = useState(Array<Blog>());
  const [displayBlogs, setDisplayBlogs] = useState<number>(0);
  const displayFilter = (blog: Blog, inx: number) => {
    if (inx >= displayBlogs) return false;
    return true;
  };
  const moreBtnAction = () =>
    setDisplayBlogs((displayBlogs) => displayBlogs + 3);
  const deleteAction = () => {
    let condition = confirm(
      `Are you sure you want to delete community '${communityId}'?`
    );
    if (!condition) return;
    deleteCommunity(communityId, cacheContext.cache["token"]).then(() => {
      alert(`Deleted community '${communityId} successfully!'`);
      router.back();
    });
  };
  const editAction = () => router.push(`/communities/${communityId}/edit`);

  useEffect(() => {
    setUsername(cacheContext.cache["username"]);
    requestCommunity(communityId).then((requestedCommunity) => {
      if (!requestedCommunity) return;
      setCommunity(requestedCommunity);
    });
    requestAllBlogs().then((requestedBlogs) => {
      if (!requestedBlogs) return;
      setBlogs(requestedBlogs);
      setDisplayBlogs(3);
    });
  }, []);
  useEffect(() => {
    const blogList = blogs
      .filter((blog) =>
        blog.communities
          .filter((community) =>
            community.toLowerCase().startsWith(communityId.toLowerCase())
          )
          .reduce(
            (prev: boolean, curr: string) =>
              prev || curr.toLowerCase().startsWith(communityId.toLowerCase()),
            false
          )
      )
      .filter(displayFilter);
    setFilteredBlogs(blogList);
  }, [displayBlogs]);
  return (
    <main className={styles["community-detailing"]}>
      <section className={styles["community-details"]}>
        <img className={styles["image"]} src={community?.image} />
        <div>
          <h1>Community Details</h1>
          <p>Name: {community?.communityId}</p>
          <p>Creator: {community?.creator}</p>
          <p>
            Date Created:
            {community?.createdAt &&
              new Date(community.createdAt).toLocaleString()}
          </p>
          <p>Description:</p>
          <p>No. of Blogs:</p>
          {username === community?.creator ? (
            <div className={styles["button-group"]}>
              <button
                className={styles["secondary-btn"]}
                onClick={deleteAction}
              >
                <i className="bi-trash" />
                Delete
              </button>
              <button className={styles["primary-btn"]} onClick={editAction}>
                <i className="bi-pencil" />
                Edit
              </button>
            </div>
          ) : null}
        </div>
      </section>
      <section>
        {filteredBlogs ? (
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
        {filteredBlogs.length > displayBlogs ? (
          <button onClick={moreBtnAction}>
            <i className="bi-arrow-down" />
            See more
          </button>
        ) : null}
      </section>
    </main>
  );
};

export default Page;

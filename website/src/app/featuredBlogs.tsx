import axios from "axios";
import styles from "./featuredBlogs.module.css";

type Blog = {
  blogId: string;
  title: string;
  image: string;
  description: string;
  publisher: string;
  tags: [string];
};

export const revalidate = 600; // Revalidate cache for every 10min

async function requestRecentBlogs(): Promise<[Blog] | null> {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  let blogs: [Blog];
  try {
    const res = await axiosInstance.get(`/api/blogs/recent`);
    blogs = res.data.blogs;
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!blogs) return null;
  return blogs;
}

//prettier-ignore
{/* @ts-expect-error Async Server Component */}
const FeaturedBlogs: React.FC = async () => {
  const blogs = await requestRecentBlogs();
  const topBlogs = blogs?.slice(3);
  return (
    <>
      {topBlogs ? (
        <ul id="blogs" className={styles["carousel-container"]}>
          {topBlogs.map((blog) => (
            <li id={blog.blogId} className={styles["carousel-item"]}>
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
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default FeaturedBlogs;

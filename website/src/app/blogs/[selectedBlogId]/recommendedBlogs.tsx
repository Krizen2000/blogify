import axios from "axios";
import styles from "./recommenderBlogs.module.css";
import Link from "next/link";

type Blog = {
  blogId: string;
  image: string;
  description: string;
  title: string;
  publisher: string;
};

async function requestRecentBlogs(): Promise<Blog[] | null> {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  let blogs: Blog[];
  try {
    const res = await axiosInstance.get(`/api/blogs/recent`);
    blogs = res.data.blogs;
    console.log("requestRecentBlogs:", res.data);
    if (!blogs) return null;
  } catch (err) {
    console.error(err);
    return null;
  }
  return blogs;
}

//prettier-ignore
{/* @ts-expect-error Async Server Component */}
const RecommendedBlogs: React.FC = async () => {
  const blogList = await requestRecentBlogs();
  return (
    <section className={styles["recommended-blogs"]}>
      {blogList ? (
        blogList.map((blog) => (
          <Link
            className={styles["no-link"]}
            key={blog.blogId}
            href={`/blogs/${blog.blogId}`}
          >
            <article className={styles["blog"]}>
              <img
                className={styles["image"]}
                src={blog.image}
                alt="blogimage"
              />
              <h5>{blog.title}</h5>
            </article>
          </Link>
        ))
      ) : (
        <div className={styles["empty-blog-list"]}>
          <i className={`bi-emoji-smile-upside-down ${styles["icon"]}`} />
          <p>There will be more contents soon</p>
        </div>
      )}
    </section>
  );
};

export default RecommendedBlogs;

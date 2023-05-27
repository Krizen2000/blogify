import styles from "./styles.module.css";
import axios from "axios";
import BlogDetails from "./blogDetails";
import RecommendedBlogs from "./recommendedBlogs";

type Blog = {
  blogId: string;
  image: string;
  description: string;
  title: string;
  publisher: string;
};
const initialBlog = {
  blogId: "",
  title: "",
  image: "",
  description: "",
  publisher: "",
};

async function requestBlogDetails(blogId: string): Promise<Blog> {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  let blog = null;
  try {
    const res = await axiosInstance.get(`/api/blogs/find/${blogId}`);
    blog = res.data;
  } catch (err) {
    console.error(err);
    return initialBlog;
  }
  return blog;
}

type props = { params: { selectedBlogId: string } };

// prettier-ignore
{/* @ts-expect-error Async Server Component */}
const BlogDetailing: React.FC = async (props: props) => {
  const { selectedBlogId } = props.params;
  const blog = await requestBlogDetails(selectedBlogId);

  return (
    <div className={styles["blog-detailing"]}>
      <BlogDetails blog={blog} />
      <RecommendedBlogs />
    </div>
  );
};

export default BlogDetailing;

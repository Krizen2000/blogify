import FeaturedBlogs from "@app/featuredBlogs";
import PopularBlogs from "@app/popularBlogs";
import styles from "./styles.module.css";
import SearchField from "./searchField";

const Blogs: React.FC = () => {
  return (
    <main className={styles["blogs-component"]}>
      <section className={styles["search-section"]}>
        <h1 className={styles["main-header-text"]}>Content Search</h1>
        <p className={styles["description-text"]}>
          Search for blogs using Creator's name, Blog title, Categories or Tags
        </p>
        <SearchField />
      </section>
      <section className={styles["featured-blogs"]}>
        <h2 className={styles["header-text"]}>Today's Featured Blogs</h2>
        <p className={styles["description-text"]}>
          Look at these exciting blogs for the day
        </p>
        <FeaturedBlogs />
      </section>

      <section className={styles["popular-blogs"]}>
        <h2 className={styles["header-text"]}>Popular Reads</h2>
        <p className={styles["description-text"]}>
          These are chosen based on multiple reviews by our communities.
        </p>
        <PopularBlogs />
      </section>

      <section className={styles["historical-section"]}>
        <h2 className={styles["header-text"]}>Historical Archive</h2>
        <p className={styles["description-text"]}>
          Past Trends and Contents are stored for future references and archival
          purposes.
        </p>
        {/* Image rotating here */}
      </section>
    </main>
  );
};

export default Blogs;

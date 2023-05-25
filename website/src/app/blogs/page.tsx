import FeaturedBlogs from "@app/featuredBlogs";
import styles from "./styles.module.css";

const Blogs: React.FC = () => {
  return (
    <main className={styles["blogs-component"]}>
      <section className={styles["search-section"]}>
        <h1 className={styles["main-header-text"]}>Content Search</h1>
        <p className={styles["description-text"]}>
          Search for blogs using Creator's name, Blog title, Categories or Tags
        </p>
        <div className={styles["input-group"]}>
          <input type="text" className={styles["search-bar"]} />
          <i className={`bi-search ${styles["icon"]}`} />
        </div>
      </section>
      <section className={styles["featured-blogs"]}>
        <h2 className={styles["header-text"]}>Today's Featured Blogs</h2>
        <p className={styles["description-text"]}>
          Look at these exciting blogs for the day
        </p>
        <FeaturedBlogs />
        <button>
          See More
          <i className="bi-arrow-down" />
        </button>
      </section>

      <section className={styles["popular-blogs"]}>
        <h2 className={styles["header-text"]}>Popular Reads</h2>
        <p className={styles["description-text"]}>
          These are chosen based on multiple reviews by our communities.
        </p>
        <FeaturedBlogs />
        <button>
          See More
          <i className="bi-arrow-down" />
        </button>
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

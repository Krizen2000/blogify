import styles from "./styles.module.css";
import BlogWindowImage from "@image/blog_window.svg";
import EditWindowImage from "@image/edit_window.svg";
import Image from "next/image";
import FeaturedBlogs from "./featuredBlogs";

const Home: React.FC = () => {
  return (
    <main className={styles["home-component"]}>
      <section className={styles["hero-section"]}>
        <h1 className={styles["hero-text"]}>
          <span>Blogging</span>
          <span>Starts with</span>
          <span className={styles["add-cursor-blink"]}>Us.</span>
        </h1>
        <div className={styles["hero-body"]}>
          <h2 className={styles["header-text"]}>
            A place where the journey begins!
          </h2>
          <p className={styles["description-text"]}>
            Write the content you always wanted the internet to watch!
          </p>
          <Image
            className={styles["image"]}
            src={BlogWindowImage}
            alt="blog window image"
          />
        </div>
      </section>
      <section className={styles["appeal-section"]}>
        <Image
          className={styles["image"]}
          src={EditWindowImage}
          alt="edit window image"
        />
        <div className={styles["appeal-body"]}>
          <h2 className={styles["header-text"]}>Create Content</h2>
          <p className={styles["description-text"]}>
            Have fun while creating content and share it with the community
          </p>
        </div>
      </section>
      <section className={styles["blogs-section"]}>
        <div className={styles["blogs-body"]}>
          <h2 className={styles["header-text"]}>Today’s Featured Blogs</h2>
          <p className={styles["description-text"]}>
            Look at these exiciting blogs for the day!
          </p>
        </div>
        <FeaturedBlogs />
      </section>

      <section className={styles["about-section"]}>
        <h2 className={styles["header-text"]}>
          WHY US <span>?</span>
        </h2>
        <div className={styles["card-holder"]}>
          <article className={styles["card"]}>
            <header className={styles["feature-title"]}>
              Great Search Results
            </header>
            <p className={styles["feature-text"]}>
              We provide our Creators with great tools to achieve higher
              rankings in SERP (Search Engine Results Page).
            </p>
          </article>
          <article className={styles["card"]}>
            <header className={styles["feature-title"]}>
              Better Realiability
            </header>
            <p className={styles["feature-text"]}>
              We will deal with the hosting so you can spend time doing your
              content.
            </p>
          </article>
          <article className={styles["card"]}>
            <header className={styles["feature-title"]}>
              Innnovative Communities
            </header>
            <p className={styles["feature-text"]}>
              You can create content while checking our communities for
              inspiration to make your blog more impactful!
            </p>
          </article>
        </div>
      </section>

      <section className={styles["cta-section"]}>
        <p className={styles["cta-text"]}>START WRITING NOW!</p>
        <a role="button" href="/signup" className={styles["cta-btn"]}>
          SignUp
        </a>
      </section>
    </main>
  );
};

export default Home;

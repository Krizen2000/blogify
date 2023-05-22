"use client";
import styles from "./newsLetterForm.module.css";

const NewsLetterForm: React.FC = () => {
  return (
    <>
      {
        <form className={styles["form"]}>
          <input type="email" className={styles["newsletter-box"]} />
          <button type="submit" className={styles["cta-btn"]}>
            Subscribe
          </button>
        </form>
      }
    </>
  );
};

export default NewsLetterForm;

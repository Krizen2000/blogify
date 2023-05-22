import styles from "./footer.module.css";
import NewsLetterForm from "./newLetterForm";

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <h2 className={styles["website-name"]}>BLOGIFY</h2>
      <div className={styles["footer-container"]}>
        <div className={styles["page-navigation"]}>
          <p className={styles["footer-element-title"]}>Blogify</p>
          <nav className={styles["secondary-navigation"]}>
            <a href="/" className={styles["link"]}>
              Home
            </a>
            <a href="/blogs" className={styles["link"]}>
              Blogs
            </a>
            <a href="/pricing" className={styles["link"]}>
              Pricing
            </a>
            <a href="/communities" className={styles["link"]}>
              Communities
            </a>
            <a href="/profile" className={styles["link"]}>
              Profile
            </a>
          </nav>
        </div>
        <div className={styles["contacts-container"]}>
          <p className={styles["footer-element-title"]}>Contact</p>
          <address className={styles["contact-links"]}>
            <a href="" className={styles["link"]}>
              Email
            </a>
            <a href="" className={styles["link"]}>
              LinkedIn
            </a>
            <a href="" className={styles["link"]}>
              Instagram
            </a>
            <a href="" className={styles["link"]}>
              Facebook
            </a>
          </address>
        </div>
        <div className={styles["newsletter-container"]}>
          <p className={styles["newsletter-text"]}>Join our NewsLetter</p>
          <NewsLetterForm />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

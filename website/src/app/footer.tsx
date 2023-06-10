import styles from "./footer.module.css";
import NewsLetterForm from "./newLetterForm";

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <a href="/" className={styles["website-name"]}>
        BLOGIFY
      </a>
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
            <a href="http://www.gmail.com" className={styles["link"]}>
              Email
            </a>
            <a href="http://www.linkedin.com" className={styles["link"]}>
              LinkedIn
            </a>
            <a href="http://www.instagram.com" className={styles["link"]}>
              Instagram
            </a>
            <a href="http://www.facebook.com" className={styles["link"]}>
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

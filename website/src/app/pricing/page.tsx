import PricingTable from "./pricingTable";
import styles from "./styles.module.css";

// ! BILL BUTTON NEEDS TO BE IMPLEMENTED
// ! SUBSCRIBE BUTTON NEEDS TO BE IMPLEMENTED
const Pricing: React.FC = () => {
  return (
    <main className={styles["pricing-component"]}>
      <section className={styles["pricing-card-section"]}>
        <p className={styles["title-text"]}>PRICING</p>
        <h1 className={styles["header-text"]}>
          Get Started Now! Pick A Plan Later
        </h1>
        <p className={styles["description-text"]}>
          Try The Free Plan And Get Access To Our Products
        </p>
        <button className={styles["btn"]}>
          <div className={styles["txt"]}>Bill Yearly</div>
          <div className={styles["txt"]}>Bill Monthly</div>
        </button>
        <div className={styles["card-holder"]}>
          <article className={styles["card"]}>
            <header className={styles["header"]}>
              <p className={styles["feature-title"]}>Free</p>
              <p className={styles["feature-text"]}>₹ 0 per annum</p>
            </header>
            <ul>
              <li className={styles["feature-item"]}>
                Creation of blogs and content
              </li>
              <li className={styles["feature-item"]}>
                Access to other communities
              </li>
              <li className={styles["feature-item"]}>Forum Tech Support</li>
            </ul>
            <button className={styles["btn"]}>Try for Free</button>
          </article>
          <article className={styles["card"]}>
            <header className={styles["header"]}>
              <p className={styles["feature-title"]}>Starter</p>
              <p className={styles["feature-text"]}>₹ 100 per annum</p>
            </header>
            <ul>
              <li className={styles["feature-item"]}>
                Creation of blogs and content
              </li>
              <li className={styles["feature-item"]}>
                Access to other communities
              </li>
              <li className={styles["feature-item"]}>Forum Tech Support</li>
              <li className={styles["feature-item"]}>Email Tech Support</li>
              <li className={styles["feature-item"]}>
                Limited Access to Premium
              </li>
            </ul>
            <button className={styles["btn"]}>Subscribe</button>
          </article>
          <article className={styles["card"]}>
            <header className={styles["header"]}>
              <p className={styles["feature-title"]}>Pro</p>
              <p className={styles["feature-text"]}>₹ 1000 per annum</p>
            </header>
            <ul>
              <li className={styles["feature-item"]}>
                Creation of blogs and content
              </li>
              <li className={styles["feature-item"]}>
                Access to other communities
              </li>
              <li className={styles["feature-item"]}>Email Tech Support</li>
              <li className={styles["feature-item"]}>Call Tech Support</li>
              <li className={styles["feature-item"]}>Full Access to Premium</li>
              <li className={styles["feature-item"]}>Full Access to Beta</li>
            </ul>
            <button className={styles["btn"]}>Subscribe</button>
          </article>
          <article className={styles["card"]}>
            <header className={styles["header"]}>
              <p className={styles["feature-title"]}>Enterprise</p>
              <p className={styles["feature-text"]}>Custom</p>
            </header>
            <ul>
              <li className={styles["feature-item"]}>
                Creation of blogs and content
              </li>
              <li className={styles["feature-item"]}>
                Access to other communities
              </li>
              <li className={styles["feature-item"]}>Email Tech Support</li>
              <li className={styles["feature-item"]}>Call Tech Support</li>
              <li className={styles["feature-item"]}>24/7 Live Support</li>
              <li className={styles["feature-item"]}>Full Access to Premium</li>
              <li className={styles["feature-item"]}>Full Access to Beta</li>
              <li className={styles["feature-item"]}>Custom Payment Cycle</li>
            </ul>
            <button className={styles["btn"]}>Subscribe</button>
          </article>
        </div>
      </section>
      <aside className={styles["table-container"]}>
        <p className={styles["table-description"]}>Compare all the features</p>
        <PricingTable />
      </aside>
    </main>
  );
};

export default Pricing;

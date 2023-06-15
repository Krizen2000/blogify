import styles from "./pricingTable.module.css";

const PricingTable: React.FC = () => {
  return (
    <div className={styles["table-container"]}>
      <table className={styles["pricing-table"]}>
        <thead className={styles["thead"]}>
          <tr>
            <th className={`${styles["plan-header"]}`} colSpan={5}>
              Plans
            </th>
          </tr>
          <tr>
            <th
              className={`${styles["table-header"]} ${styles["feature-title"]}`}
            >
              Features
            </th>
            <th className={`${styles["table-header"]} ${styles["th"]}`}>
              Free
            </th>
            <th className={`${styles["table-header"]} ${styles["th"]}`}>
              Starter
            </th>
            <th className={`${styles["table-header"]} ${styles["th"]}`}>Pro</th>
            <th className={`${styles["table-header"]} ${styles["th"]}`}>
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className={styles["feature-header"]}>
              Creation of blogs and content
            </th>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
          </tr>
          <tr>
            <th className={styles["feature-header"]}>
              Access to other communities
            </th>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
          </tr>
          <tr>
            <th className={styles["feature-header"]}>Forum Tech Support</th>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
          </tr>
          <tr>
            <th className={styles["feature-header"]}>Email Tech Support</th>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
          </tr>
          <tr>
            <th className={styles["feature-header"]}>Call Tech Support</th>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
          </tr>
          <tr>
            <th className={styles["feature-header"]}>Full Access to Premium</th>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
          </tr>
          <tr>
            <th className={styles["feature-header"]}>Full Access to Beta</th>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
          </tr>
          <tr>
            <th className={styles["feature-header"]}>24/7 Live Support</th>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
          </tr>
          <tr>
            <th className={styles["feature-header"]}>Custom Payment Cycle</th>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-x ${styles["icon-x"]}`} />
            </td>
            <td>
              <i className={`bi-check ${styles["icon-check"]}`} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;

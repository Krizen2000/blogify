import styles from "./styles.module.css";

const Communities: React.FC = () => {
  return (
    <>
      <h1>Communities</h1>
      <p>Explore wide range of communities you can!</p>
      <div className={styles["input-group"]}>
        <input type="text" className={styles["search-bar"]} />
        <i className={`bi-search ${styles["icon"]}`} />
      </div>

      <h2>Some Popular Communities</h2>
      <p>These communities are trending like wild fire!</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <svg height="6rem" width="6rem">
          <rect
            x="10"
            y="10"
            height="5rem"
            width="5rem"
            style={{
              stroke: "var(--clr-txt-rgb)",
              strokeWidth: "var(--size-200)",
            }}
          />
        </svg>
        <svg height="6rem" width="6rem">
          <rect
            x="10"
            y="10"
            height="5rem"
            width="5rem"
            style={{
              stroke: "var(--clr-txt-rgb)",
              strokeWidth: "var(--size-200)",
            }}
          />
        </svg>
        <svg height="6rem" width="6rem">
          <rect
            x="10"
            y="10"
            height="5rem"
            width="5rem"
            style={{
              stroke: "var(--clr-txt-rgb)",
              strokeWidth: "var(--size-200)",
            }}
          />
        </svg>
        <svg height="6rem" width="6rem">
          <rect
            x="10"
            y="10"
            height="5rem"
            width="5rem"
            style={{
              stroke: "var(--clr-txt-rgb)",
              strokeWidth: "var(--size-200)",
            }}
          />
        </svg>
        <svg height="6rem" width="6rem">
          <rect
            x="10"
            y="10"
            height="5rem"
            width="5rem"
            style={{
              stroke: "var(--clr-txt-rgb)",
              strokeWidth: "var(--size-200)",
            }}
          />
        </svg>
        <svg height="6rem" width="6rem">
          <rect
            x="10"
            y="10"
            height="5rem"
            width="5rem"
            style={{
              stroke: "var(--clr-txt-rgb)",
              strokeWidth: "var(--size-200)",
            }}
          />
        </svg>
      </div>
      <button>
        See More
        <i className="bi-arrow-down" />
      </button>

      <h2>Hidden Societies</h2>
      <p>Some peculiar communities which might peak your interest.</p>
      <div style={{ display: "flex" }}>
        <svg height="6rem" width="6rem">
          <rect
            x="10"
            y="10"
            height="5rem"
            width="5rem"
            style={{
              stroke: "var(--clr-txt-rgb)",
              strokeWidth: "var(--size-200)",
            }}
          />
        </svg>
        <svg height="6rem" width="6rem">
          <rect
            x="10"
            y="10"
            height="5rem"
            width="5rem"
            style={{
              stroke: "var(--clr-txt-rgb)",
              strokeWidth: "var(--size-200)",
            }}
          />
        </svg>
        <svg height="6rem" width="6rem">
          <rect
            x="10"
            y="10"
            height="5rem"
            width="5rem"
            style={{
              stroke: "var(--clr-txt-rgb)",
              strokeWidth: "var(--size-200)",
            }}
          />
        </svg>
      </div>
      <button>
        See More
        <i className="bi-arrow-down" />
      </button>
    </>
  );
};

export default Communities;

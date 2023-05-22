import styles from "./styles.module.css";

const Blogs: React.FC = () => {
  return (
    <>
      <h1>Content Search</h1>
      <p>
        Search for blogs using Creator's name, Blog title, Categories or Tags
      </p>
      <div className={styles["input-group"]}>
        <input type="text" className={styles["search-bar"]} />
        <i className={`bi-search ${styles["icon"]}`} />
      </div>
      <h2>Today's Featured Blogs</h2>
      <p>Look at these exciting blogs for the day</p>
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

      <h2>Popular Reads</h2>
      <p>These are chosen based on multiple reviews by our communities.</p>
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

      <h2>Historical Archive</h2>
      <p>
        Past Trends and Contents are stored for future references and archival
        purposes.
      </p>
      {/* Image rotating here */}
    </>
  );
};

export default Blogs;

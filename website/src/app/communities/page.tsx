import axios from "axios";
import styles from "./styles.module.css";
import Link from "next/link";

type Community = {
  communityId: string;
  creator: string;
  image: string;
};

export const revalidate = 600; // Revalidate cache for every 10min

async function requestPopularCommunities(): Promise<Community[]> {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  let communities = Array<Community>();
  try {
    const res = await axiosInstance.get("/api/communities/sort/popular");
    communities = res.data?.communities ?? [];
  } catch (err) {
    console.log(err);
  }
  return communities;
}

async function requestHiddenCommunities(): Promise<Community[]> {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  let communities = Array<Community>();
  try {
    const res = await axiosInstance.get("/api/communities/sort/hidden");
    communities = res.data?.communities ?? [];
  } catch (err) {
    console.log(err);
  }
  return communities;
}

//prettier-ignore
{/* @ts-expect-error Async Server Component */}
const Communities: React.FC = async () => {
  const popularCommunities = await requestPopularCommunities();
  const hiddenCommunities = await requestHiddenCommunities();
  return (
    <main className={styles["communities-component"]}>
      <section className={styles["search-section"]}>
        <h1 className={styles["main-header-text"]}>Communities</h1>
        <p className={styles["description-text"]}>
          Explore wide range of communities you can!
        </p>
        <div className={styles["input-group"]}>
          <input type="text" className={styles["search-bar"]} />
          <i className={`bi-search ${styles["icon"]}`} />
        </div>
      </section>

      <section className={styles["popular-communities"]}>
        <h2 className={styles["header-text"]}>Some Popular Communities</h2>
        <p className={styles["description-text"]}>
          These communities are trending like wild fire!
        </p>
        {popularCommunities ? (
          <ul id="blogs" className={styles["carousel-container"]}>
            {popularCommunities.map((community) => (
              <li
                id={community.communityId}
                className={styles["carousel-item"]}
              >
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  href={`/blogs/${community.communityId}`}
                >
                  <article className={styles["card"]}>
                    <img
                      className={styles["card-image"]}
                      src={community.image}
                    />
                    <div className={styles["author-details"]}>
                      <header className={styles["article-title"]}>
                        {community.communityId}
                      </header>
                      <p className={styles["author-title"]}>Creator</p>
                      <span className={styles["article-author"]}>
                        {community.creator}
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <button>
          See More
          <i className="bi-arrow-down" />
        </button>
      </section>

      <section className={styles["hidden-section"]}>
        <h2 className={styles["header-text"]}>Hidden Societies</h2>
        <p className={styles["description-text"]}>
          Some peculiar communities which might peak your interest.
        </p>
        {hiddenCommunities ? (
          <ul id="blogs" className={styles["carousel-container"]}>
            {hiddenCommunities.map((community) => (
              <li
                id={community.communityId}
                className={styles["carousel-item"]}
              >
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  href={`/blogs/${community.communityId}`}
                >
                  <article className={styles["card"]}>
                    <img
                      className={styles["card-image"]}
                      src={community.image}
                      alt="Blog Image"
                    />
                    <div className={styles["author-details"]}>
                      <header className={styles["article-title"]}>
                        {community.communityId}
                      </header>
                      <p className={styles["author-title"]}>Creator</p>
                      <span className={styles["article-author"]}>
                        {community.creator}
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <button>
          See More
          <i className="bi-arrow-down" />
        </button>
      </section>
    </main>
  );
};

export default Communities;

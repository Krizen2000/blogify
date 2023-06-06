"use client";

import { useEffect, useState } from "react";
import styles from "./searchField.module.css";
import Link from "next/link";
import axios from "axios";

type Community = {
  communityId: string;
  creator: string;
  image: string;
};

async function requestAllCommunities(): Promise<Community[] | null> {
  let communities: Community[] | null = null;
  try {
    const res = await axios.get("/api/communities");
    communities = res.data.communities;
  } catch (err) {
    console.error(err);
  }
  if (!communities) return null;
  return communities;
}

// ! SEARCH FUNCTIONS WORKS ONLY WITH STARTING LETTERS OF COMMUNITY ID
// ! MORE BUTTON AND NO. OF CONTENT ADJUST NEEDS TO BE IMPLEMENTED
const SearchField: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [communities, setCommunities] = useState(Array<Community>());
  useEffect(() => {
    requestAllCommunities().then((requestedCommunities) => {
      if (!requestedCommunities) return;
      setCommunities(requestedCommunities);
    });
  }, []);
  return (
    <div className={styles["search-field"]}>
      <div className={styles["input-group"]}>
        <input
          type="text"
          className={styles["search-bar"]}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <i className={`bi-search ${styles["icon"]}`} />
      </div>
      {communities && searchText ? (
        <ul id="blogs" className={styles["carousel-container"]}>
          {communities
            .filter((community) => community.communityId.startsWith(searchText))
            .map((community) => (
              <li
                id={community.communityId}
                className={styles["carousel-item"]}
              >
                {/* <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  href={`/communities/${community.communityId}`}
                > */}
                <article className={styles["card"]}>
                  <img className={styles["card-image"]} src={community.image} />
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
                {/* </Link> */}
              </li>
            ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchField;

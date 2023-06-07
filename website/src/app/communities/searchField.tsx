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

const SearchField: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [communities, setCommunities] = useState(Array<Community>());
  const [filteredCommunities, setFilteredCommunities] = useState(
    Array<Community>()
  );
  const [displayCommunities, setDisplayCommunities] = useState<number>(3);
  const displayFilter = (community: Community, inx: number) => {
    if (inx >= displayCommunities) return false;
    return true;
  };
  const moreBtnAction = () =>
    setDisplayCommunities((displayCommunities) => displayCommunities + 3);

  useEffect(() => {
    requestAllCommunities().then((requestedCommunities) => {
      if (!requestedCommunities) return;
      setCommunities(requestedCommunities);
    });
  }, []);
  useEffect(() => {
    const communityList = communities
      .filter(
        (blog) =>
          blog.communityId.toLowerCase().startsWith(searchText.toLowerCase()) ||
          blog.creator.toLowerCase().startsWith(searchText.toLowerCase())
      )
      .filter(displayFilter);
    setFilteredCommunities(communityList);
  }, [searchText]);

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
      {filteredCommunities && searchText ? (
        <ul id="blogs" className={styles["carousel-container"]}>
          {filteredCommunities.map((community) => (
            <li id={community.communityId} className={styles["carousel-item"]}>
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
      {filteredCommunities.length > displayCommunities && searchText ? (
        <button onClick={moreBtnAction}>
          <i className="bi-arrow-down" />
          See more
        </button>
      ) : null}
    </div>
  );
};

export default SearchField;

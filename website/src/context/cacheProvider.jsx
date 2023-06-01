"use client";

import React, { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

export const CacheContext = createContext();
export const useCacheContext = () => useContext(CacheContext);

const initialCache = {
  token: null,
  name: null,
  username: null,
  isSubscribed: false,
};

function useLoadCache() {
  const [cache, setCache] = useState(initialCache);
  useEffect(() => {
    const localCache = localStorage.getItem("data");
    console.log("localCache", localCache);
    const cache = localCache ? JSON.parse(localCache) : initialCache;
    setCache(cache);
  }, []);
  return [cache, setCache];
}

function useUpdateCache(cache) {
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(cache));
  }, [cache]);
}

export default function CacheProvider(props) {
  const [cache, setCache] = useLoadCache();
  useUpdateCache(cache);

  return (
    <CacheContext.Provider value={{ cache, setCache }}>
      {props.children}
    </CacheContext.Provider>
  );
}

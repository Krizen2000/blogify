"use client";

import { useCacheContext } from "@context/cacheProvider";
import { useEffect, useState } from "react";

export default function useCheckLoggedIn(): boolean {
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const cacheContext = useCacheContext();

  useEffect(() => {
    setIsLoggedIn(cacheContext.cache["name"] ? true : false);
  }, [cacheContext]);

  return isLoggedIn;
}

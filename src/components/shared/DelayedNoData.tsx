"use client";

import { useEffect, useState } from "react";
import NoData from "./NoData";
import LoadingData from "./Loading";

const DelayedNoData = () => {
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNoData(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return showNoData ? <NoData /> : <LoadingData />;
};

export default DelayedNoData;

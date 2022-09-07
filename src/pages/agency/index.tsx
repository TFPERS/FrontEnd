import { useRouter } from "next/router";
import React, { useEffect } from "react";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/agency/login");
  });
  return <div></div>;
};

export default index;

"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
const CustomePagination = ({ size, number }) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const page = Number(searchParam.get("page") || 1);

  let queryParams: URLSearchParams;

  /**
   * Update page url parameter by pagination navigation controller
   */
  const handlePageChange = (currentPage) => {

    if (typeof window === "undefined") {
      return
    }
    queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has("page")) {
      queryParams.set("page", currentPage);
    } else {
      queryParams.append("page", currentPage);
    }
    const path = window.location.pathname + "?" + queryParams.toString();
    router.push(path);
  }

  return (
    <>

      <div className="flex mt-20 justify-center">

      </div>
    </>
  );
};

export default CustomePagination;

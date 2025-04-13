"use client";
import CenterCard from "@/app/components/card/CenterCard";
import { AuthControllerService } from "@/gen";
import React from "react";
const ComponentName = ({ props }) => {
  const refresh = async () => {
    const res = await AuthControllerService.refreshAccessToken();
    console.log(res);
  };

  return (
    <>
      <CenterCard>
        <button onClick={refresh}>Refresh</button>
        <p>For display user info</p>
      </CenterCard>
    </>
  );
};

export default ComponentName;

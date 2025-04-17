"use client";
import CenterCard from "@/app/components/card/CenterCard";
import { AuthControllerService } from "@/gen";
import React from "react";
const UserInformationPage = () => {
  const refresh = async () => {
    const res = await AuthControllerService.refreshAccessToken();
    console.log(res);
  };

  function createError(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <CenterCard>
        <button className="btn" onClick={refresh}>
          Refresh
        </button>
        <button className="btn" onClick={createError}>
          Create Error
        </button>
        <p>For display user info</p>
      </CenterCard>
    </>
  );
};

export default UserInformationPage;

"use client";
import { MenuItem } from "./menu-item";
import Link from "next/link";
import Logo from "../common/logo";
import { adminMenuItems } from "@/config/sidebar";

/**
 * List of item (action) for manager shop data
 */
export const AdminSideBar = () => {
  return (
    <>
      <span className="absolute text-gray-900 text-4xl top-5 left-4 cursor-pointer"></span>
      <div className="sidebar lg:left-0 p-2 w-[220px] overflow-y-auto text-center">
        <div className="text-gray-950 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <Link href={"/"}>
              <img
                className="mr-[-9px] mt-[-5px] cursor-pointer"
                src="/logoAdmin.svg"
                alt="logo login"
        />
            </Link>
          </div>
          <div className="my-2  h-[1px]"></div>
        </div>
        {
          // Display menu item base on items structure
          adminMenuItems.map((menuItem, idx) => {
            return <MenuItem key={idx} item={menuItem} />;
          })
        }
      </div>
    </>
  );
};

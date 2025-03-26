'use client';
import { MouseEvent, useState } from "react";
import Brand from "../brand";
import { SidebarItem } from "@/models/SidebarItem";
import { MenuItem } from "./MenuItem";
import Link from "next/link";


const items: Array<SidebarItem> = [
  {
    title: "Kho hàng",
    href: "#",
    subItems: [
      {
        title: "Nhà cung cấp",
        href: "/admin/suppliers/",
        subItems: [],
      },
      {
        title: "Sản phẩm",
        href: "/admin/products",
        subItems: [],
      },
    ],
  },
  {
    title: "Đăng xuất",
    href: "/logout",
    subItems: [],
  }
]
export const AdminSideBar = () => {
  // const [sidebar, setSidebar] = useState(true);
  // function openSidebar(event: MouseEvent<HTMLSpanElement, MouseEvent>): void {
  //   setSidebar(true);
  // }

  // function dropdown(event: MouseEvent<HTMLDivElement, MouseEvent>): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <>

      <span
        className="absolute text-gray-900 text-4xl top-5 left-4 cursor-pointer"
        // onClick={openSidebar}
      >
      </span>
      {/* Alternative use fixed  position: fixed top-0 bottom-0 */}
      <div
        className="sidebar lg:left-0 p-2 w-[220px] overflow-y-auto text-center"
      >
        <div className="text-gray-950 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <Link href={"/login"}>
              <Brand />
            </Link>
            {/* Button to tooggle sidebar
            <i
              className="bi bi-x cursor-pointer ml-28 lg:hidden"
              onClick={openSidebar}
            ></i>
            */}
          </div>
          <div className="my-2  h-[1px]"></div>
        </div>
        {
          // Display menu item base on items structure
          items.map(function(menuItem, idx) {
            return <MenuItem key={idx} item={menuItem} />;
          })
        }

      </div>

    </>
  );
};

'use client';
import { SidebarItem } from "@/models/SidebarItem";
import { MenuItem } from "./MenuItem";
import Link from "next/link";
import Brand from "../Brand";


/**
 * List of item (action) for manager shop data
 */
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
      {
        title: "Nhãn hàng",
        href: "/admin/brands",
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

  return (
    <>

      <span
        className="absolute text-gray-900 text-4xl top-5 left-4 cursor-pointer"
      >
      </span>
      <div
        className="sidebar lg:left-0 p-2 w-[220px] overflow-y-auto text-center"
      >
        <div className="text-gray-950 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <Link href={"/login"}>
              <Brand />
            </Link>
          </div>
          <div className="my-2  h-[1px]"></div>
        </div>
        {
          // Display menu item base on items structure
          items.map((menuItem, idx) => {
            return <MenuItem key={idx} item={menuItem} />;
          })
        }

      </div>

    </>
  );
};

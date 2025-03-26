'use client';
import { useState } from "react";
import Brand from "../brand";

interface SidebarItem {
  title: string,
  href: string;
  subItems: Array<SidebarItem>;
}

const items: Array<SidebarItem> = [
  {
    title: "Home",
    href: "#",
    subItems: [
      {
        title: "Personal",
        href: "#",
        subItems: [],
      },
      {
        title: "Friends",
        href: "#",
        subItems: [],
      },
    ],
  },
  {
    title: "Bookmark",
    href: "#",
    subItems: [],
  }
]
export const AdminSideBar = () => {
  const [sidebar, setSidebar] = useState(true);
  function openSidebar(event: MouseEvent<HTMLSpanElement, MouseEvent>): void {
    setSidebar(true);
  }

  function dropdown(event: MouseEvent<HTMLDivElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>

      <span
        className="absolute text-gray-900 text-4xl top-5 left-4 cursor-pointer"
        onClick={openSidebar}
      >
      </span>
      {/* Alternative use fixed  position: fixed top-0 bottom-0 */}
      <div
        className="sidebar lg:left-0 p-2 w-[220px] overflow-y-auto text-center"
      >
        <div className="text-gray-950 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <Brand />
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

const MenuItem = ({ item }: { item: SidebarItem }) => {
  function dropdown(event: MouseEvent<HTMLDivElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {/* Item in sidebar with link */}
      {/* TODO: Link to item page*/}
      <div
        className="overflow-y-scroll p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-300 text-gray-900"
        onClick={dropdown}
      >
        <div className="flex justify-between w-full items-center">
          <span className="text-[15px] ml-4 text-gray-800 font-bold">{item.title}</span>
          <span className="text-sm rotate-180" id="arrow">
            <i className="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
        className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-600 font-bold"
        id="submenu"
      >
        {
          // Sub item menu - current support max depth is 2 for items structure
          item.subItems.map((subItem, index) => {
            return (
              <div key={index}>
                <h1 className="cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-1">
                  {subItem.title}
                </h1>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

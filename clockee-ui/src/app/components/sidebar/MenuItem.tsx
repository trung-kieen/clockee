import { SidebarItem } from "@/models/SidebarItem";
import Link from "next/link";

/**
 * Use to diplay common action for admin to quick navigate: logout, products, brands, etc
 */
export const MenuItem = ({ item }: { item: SidebarItem }) => {
  return (
    <>
      {/* Item in sidebar with link */}
      <div className="overflow-y-scroll p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200 text-gray-900">
        <div className="flex justify-between w-full items-center">
          <span className="text-md text-[15px] text-gray-800 font-bold">
            {item.title}
          </span>
          <span className="text-sm rotate-180" id="arrow">
            <i className="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
        className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-500 font-bold"
        id="submenu"
      >
        {
          // Sub item menu - current support max depth is 2 for items structure
          item.subItems.map((subItem, index) => {
            return (
              <div key={index}>
                <Link href={subItem.href}>
                  <h1 className="cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-1">
                    {subItem.title}
                  </h1>
                </Link>
              </div>
            );
          })
        }
      </div>
    </>
  );
};

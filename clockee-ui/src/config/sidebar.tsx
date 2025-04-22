import { SidebarItem } from "@/model/SidebarItem";

export const adminMenuItems: Array<SidebarItem> = [
  {
    title: "Sản phẩm",
    href: "#",
    subItems: [
      {
        title: "Danh sách đơn hàng",
        href: "/admin/orders/",
        subItems: [],
      },
      {
        title: "Người dùng",
        href: "/admin/user/",
        subItems: [],
      },
      {
        title: "Sản phẩm",
        href: "/admin/products",
        subItems: [],
      },
      {
        title: "Thương hiệu",
        href: "/admin/brands",
        subItems: [],
      },
      {
        title: "Thống kê",
        href: "/admin/dashboard",
        subItems: [],
      },
    ],
  },
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
        title: "Nhập hàng",
        href: "/admin/purcharse/",
        subItems: [],
      },
    ],
  },
  {
    title: "Đăng xuất",
    href: "/logout",
    subItems: [],
  },
];

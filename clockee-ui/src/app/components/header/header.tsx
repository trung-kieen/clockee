"use client";
import { usePathname } from 'next/navigation'
import SimpleHeader from "./SimpleHeader";
import { MainHeader } from "./MainHeader";



/**
 * Manager dynamic header base on route path
 *
 */
export const Header = () => {


  const pathname = usePathname();


  const routes = [
    // { path: '/', header: <Header_home />, exact: true },
    { path: '/login/', header: <SimpleHeader />, exact: true },
    { path: '/login/reset', header: <SimpleHeader />, exact: true },
    { path: '/login/success', header: <SimpleHeader />, exact: true },
    { path: '/signup', header: <SimpleHeader />, exact: true },
    { path: '/signup/success', header: <SimpleHeader />, exact: true },

    // Regex pattern for header path
    { pattern: /^\/admin\/.+$/, header: <>{/* Config in admin layout instead */}</> },
  ];

  for (const route of routes) {
    // Return header for exact match route path
    if (route.exact && route.path == pathname) {
      return route.header;
    }
    // Return header for pattern match route path
    if (route.pattern && route.pattern.test(pathname)) {
      return route.header;
    }
  }
  return (
    <>
      <MainHeader />
    </>
  )
}

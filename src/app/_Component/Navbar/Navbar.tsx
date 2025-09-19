"use client";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { CountContaxt } from "@/CountProvider";
export function Navbar() {
  const { data, status } = useSession();
  const CountData = useContext(CountContaxt);
  const MenuNavbar: { path: string; content: string; protected: boolean }[] = [
    { path: "/products", content: "products", protected: false },
    { path: "/category", content: "category", protected: false },
    { path: "/brands", content: "brands", protected: false },
    { path: "/wishlist", content: "wishlist", protected: false },
    { path: "/allorders", content: "orders", protected: true },
  ];
  const MenuAuthentication: { path: string; content: string }[] = [
    { path: "/login", content: "login" },
    { path: "/register", content: "register" },
  ];
  function logout() {
    signOut({ callbackUrl: "/login" });
  }
  return (
    <NavigationMenu
      viewport={false}
      className="shadow-2xl max-w-full justify-between p-3 "
    >
      {/* ================================ */}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">
              <Image
                src={"/images/freshcart-logo.svg"}
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* ================================ */}
        {MenuNavbar.map((component) => {
          return (
            <NavigationMenuItem key={component.path}>
              {component.protected && status == "authenticated" && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={component.path}>{component.content}</Link>
                </NavigationMenuLink>
              )}
              {!component.protected && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={component.path}>{component.content}</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
        {status === "authenticated" && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="cart">Cart</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        {/* ================================ */}
      </NavigationMenuList>
      {/* ================================ */}
      <NavigationMenuList>
        {/* ================================ */}
        {status === "authenticated" ? (
          <>
            <NavigationMenuItem className="me-2">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="cart">
                  {" "}
                  <div>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {CountData?.count}
                    </span>
                  </div>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">
                  <i className="fa-brands fa-facebook"></i>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">
                  <i className="fa-brands fa-tiktok"></i>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">
                  <i className="fa-brands fa-twitter"></i>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">
                  <i className="fa-brands fa-linkedin"></i>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <div className="flex flex-row">
                  <span onClick={logout} className="cursor-pointer">
                    Helo
                  </span>
                  <span className="text-main"> {data.user?.name}</span>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span onClick={logout} className="cursor-pointer">
                  logout
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            {MenuAuthentication.map((component) => {
              return (
                <NavigationMenuItem key={component.path}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={component.path}>{component.content}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </>
        )}
        {/* ================================ */}
      </NavigationMenuList>
      {/* ================================ */}
    </NavigationMenu>
  );
}

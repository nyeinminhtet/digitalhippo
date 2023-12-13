import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";

import MaxWrapperWidth from "./MaxWrapperWidth";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import Cart from "./Cart";
import { buttonVariants } from "./ui/button";
import { getServerSideUser } from "@/lib/payload-utils";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const nextCookie = cookies();
  const { user } = await getServerSideUser(nextCookie);

  return (
    <div className="bg-white sticky top-0 inset-x-0 z-50 h-16">
      <header className=" relative bg-white">
        <MaxWrapperWidth>
          <div className=" border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TODO:MOBILE nav */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className=" hidden z-50 lg:block lg:ml-8 lg:self-stretch">
                <NavItems />
              </div>

              <div className=" ml-auto flex items-center">
                <div className=" hidden lg:flex lg:items-center lg:flex-1 lg:justify-end lg:space-x-6">
                  {!user ? (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign in
                    </Link>
                  ) : null}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create account
                    </Link>
                  )}

                  {!user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWrapperWidth>
      </header>
    </div>
  );
};

export default Navbar;

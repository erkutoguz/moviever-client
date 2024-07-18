import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import Brand from "../common/Brand";

function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { tag: "Register", link: "/register" },
    { tag: "About", link: "/about" },
  ];
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      style={{ backgroundColor: "#0A2540" }}
    >
      <NavbarContent className=" pr-3" justify="start">
        <NavbarBrand>
          <Brand />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/sign-in" className="text-white">
            Sign in
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="" className="hidden lg:flex">
        <NavbarItem className="">
          <Button
            as={Link}
            href="/sign-in"
            className="bg-btnColor w-36 md:w-48 font-normal text-white  rounded-none text-base"
          >
            Get Started
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden" justify="">
        <NavbarMenuToggle
          className="text-white"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className=" text-darkBlue" href={item.link} size="lg">
              {item.tag}
            </Link>
          </NavbarMenuItem>
        ))}
        <div className="footer text-center mt-8 px-16">
          <p className="text-sm font-light">
            Copyright © 2024 Moviever. <br />
            All rights reserved.
          </p>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}

export default LandingNavbar;

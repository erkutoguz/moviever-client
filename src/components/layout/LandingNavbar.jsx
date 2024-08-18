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
  Switch,
} from "@nextui-org/react";
import { useState } from "react";
import Brand from "../common/Brand";
import SunIcon from "../../assets/icons/SunIcon";
import MoonIcon from "../../assets/icons/MoonIcon";
import { useAppContext } from "../../context/appContext";

function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleTheme, theme } = useAppContext();
  const [themeMode, setThemeMode] = useState(theme === "light");
  const toggleThemeMode = () => {
    setThemeMode(!themeMode);
    toggleTheme();
  };
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

      <div className="flex justify-center items-center gap-3">
        <NavbarContent justify="end">
          <NavbarItem>
            <Switch
              defaultSelected
              isSelected={themeMode}
              onValueChange={toggleThemeMode}
              size="lg"
              color="warning"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
            ></Switch>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="">
          <NavbarItem>
            <Link href="/sign-in" className="text-white">
              Sign in
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex ">
          <NavbarItem className="">
            <Button
              as={Link}
              href="/sign-in"
              aria-label="get-started-button"
              className="bg-btnColor w-36 md:w-48 font-normal text-white  rounded-none text-base"
            >
              Get Started
            </Button>
          </NavbarItem>
        </NavbarContent>
      </div>

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

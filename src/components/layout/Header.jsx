import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
} from "@nextui-org/react";
import Brand from "../common/Brand";
import { useAppContext } from "../../context/appContext";
import MovieSearchBar from "../common/MovieSearchBar";
import SunIcon from "../../assets/icons/SunIcon";
import MoonIcon from "../../assets/icons/MoonIcon";
import { useState } from "react";

function Header() {
  const { user, userProfilePicture, logout, toggleTheme, theme } =
    useAppContext();
  const [themeMode, setThemeMode] = useState(theme === "light");

  const toggleThemeMode = () => {
    setThemeMode(!themeMode);
    toggleTheme();
  };

  return (
    <Navbar style={{ backgroundColor: "#0A2540" }}>
      <NavbarBrand className="hidden lg:flex">
        <Brand />
      </NavbarBrand>
      <NavbarBrand className="flex lg:hidden ">
        <Link href="/" aria-label="home">
          <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="flex gap-0 pl-4" justify="end">
        <NavbarItem className="hidden md:flex">
          <Link
            href="/all-movies"
            aria-label="all-movies"
            className="text-white mr-6 md:mr-16 hover:cursor-pointer"
          >
            Movies
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Link
            aria-label="my-watchlists"
            href="/watchlists"
            className="text-white mr-6 md:mr-16 hover:cursor-pointer"
          >
            My Watchlists
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            href="/recommended-movies"
            className="text-white hidden lg:flex lg:mr-16 hover:cursor-pointer"
            aria-label="recommended-movies"
          >
            Recommended
          </Link>
        </NavbarItem>

        <NavbarItem>
          <MovieSearchBar />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent>
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

      <NavbarContent as="div" justify="end" className="">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {userProfilePicture !== "null" ? (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user}
                size="sm"
                src={userProfilePicture}
              />
            ) : (
              <Avatar
                name={user}
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                isBordered
              />
            )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2 text-textColor">
              <p className="font-medium">Signed in as</p>
              <p className="font-semibold">{user}</p>
            </DropdownItem>

            <DropdownItem href="/home" key="home" className="text-textColor">
              Home
            </DropdownItem>
            <DropdownItem
              href="/watchlists"
              key="watchlists"
              className="text-textColor"
            >
              My Watchlists
            </DropdownItem>
            <DropdownItem
              href="/recommended"
              className="lg:hidden flex text-textColor"
              key="recommended"
            >
              Recommended
            </DropdownItem>

            <DropdownItem
              href="/profile/me"
              key="user-profile"
              className="text-textColor"
            >
              Profile
            </DropdownItem>
            <DropdownItem href="/about" key="about" className="text-textColor">
              About
            </DropdownItem>

            <DropdownItem
              key="logout"
              href="/logout"
              color="danger"
              className="text-danger"
              onPress={() => {
                logout();
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;

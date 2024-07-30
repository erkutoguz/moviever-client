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
} from "@nextui-org/react";
import Brand from "../common/Brand";
import { useAppContext } from "../../context/appContext";

function Header() {
  const { user, userProfilePicture, logout } = useAppContext();
  return (
    <Navbar style={{ backgroundColor: "#0A2540" }}>
      <NavbarBrand className="hidden lg:flex">
        <Brand />
      </NavbarBrand>
      <NavbarBrand className="flex lg:hidden">
        <Link href="/">
          <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="flex gap-0" justify="end">
        <NavbarItem>
          <Link
            href="/home"
            className="text-white mr-6 md:mr-16 hover:cursor-pointer"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/all-movies"
            className="text-white mr-6 md:mr-16 hover:cursor-pointer"
          >
            Movies
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link
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
          >
            Recommended
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" className="text-white hover:cursor-pointer">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
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
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-medium">Signed in as</p>
              <p className="font-semibold">{user}</p>
            </DropdownItem>

            <DropdownItem href="/watchlists" key="watchlists">
              My Watchlists
            </DropdownItem>
            <DropdownItem
              href="/recommended"
              className="lg:hidden flex"
              key="recommended"
            >
              Recommended
            </DropdownItem>

            <DropdownItem href="/sign-in" key="user-profile">
              Profile
            </DropdownItem>

            <DropdownItem
              key="logout"
              href="/logout"
              color="danger"
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

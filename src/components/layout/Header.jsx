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
  const { user } = useAppContext();
  return (
    <Navbar style={{ backgroundColor: "#0A2540" }}>
      <NavbarBrand className="hidden lg:flex">
        <Brand />
      </NavbarBrand>
      <NavbarBrand className="flex lg:hidden">
        <p className="text-brandColor text-2xl md:text-3xl font-bold">M</p>
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

        <NavbarItem>
          <Link
            href="/recommended-movies"
            className="text-white hidden lg:flex lg:mr-16 hover:cursor-pointer"
          >
            Recommended
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white hover:cursor-pointer">About</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {/* <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            /> */}
            <Avatar
              name={user}
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              isBordered
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-medium">Signed in as</p>
              <p className="font-semibold">{user}</p>
            </DropdownItem>

            <DropdownItem href="/sign-in" key="settings">
              My Watchlists
            </DropdownItem>

            <DropdownItem href="/sign-in" key="settings">
              Profile
            </DropdownItem>

            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;

import React from "react";
import { Menu, Icon } from "semantic-ui-react";

const NavBar = ({ page, setPage, user, setUser, setContacts }) => {
  const handleNav = (e, data) => {
    setPage(data.name);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setContacts([]);
    setPage("Login");
  };

  return (
    <Menu color="teal">
      <Menu.Item header>
        <Icon name="user circle outline" />
        Profile Finder
      </Menu.Item>
      {user && (
        <Menu.Item
          as="a"
          name="Home"
          active={page === "Home"}
          onClick={handleNav}
        />
      )}
      {/* <Menu.Item
        as="a"
        name="About"
        active={page === "About"}
        onClick={handleNav}
      /> */}
      {user ? (
        <Menu.Item as="a" name="Logout" onClick={handleLogout} />
      ) : (
        <>
          <Menu.Item
            as="a"
            name="Login"
            active={page === "Login"}
            onClick={handleNav}
          />
          <Menu.Item
            as="a"
            name="Signup"
            active={page === "Signup"}
            onClick={handleNav}
          />
        </>
      )}
    </Menu>
  );
};

export default NavBar;

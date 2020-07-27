import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const NavBar = () => {
  return (
    <Menu color="teal">
      <Menu.Item header>
        <Icon name="search" />
        Profile Finder
      </Menu.Item>
      <Menu.Item as="a" name="Home" active />
      <Menu.Item as="a" name="About" />
    </Menu>
  );
};

export default NavBar;

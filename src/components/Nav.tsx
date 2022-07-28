import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const { width } = useWindowDimensions();

  const getMobileMenu = () => {
    if (width <= 768) {
      return (
        <FontAwesomeIcon icon={faBars} size="lg" className="nav-mobile-menu" />
      );
    }

    return null;
  };
  return (
    <nav className="navigation">
      {getMobileMenu()} <strong>ConfamForum</strong>
    </nav>
  );
};

export default Nav;

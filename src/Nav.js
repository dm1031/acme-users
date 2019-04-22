import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ location }) => {
  const links = [
    {
      type: "Home",
      path: "/"
    },
    {
      type: "Users",
      path: "/users"
    }
  ];

  return (
    <ul className="nav nav-tabs">
      {links.map(link => (
        <Link
          to={link.path}
          key={link.type}
          className={
            location.pathname === link.path ? "nav-link active" : "nav-link"
          }
        >
          {link.type}
        </Link>
      ))}
    </ul>
  );
};

export default Nav;

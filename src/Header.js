import React from "react";

const Header = ({ title }) => {
  return <header>{title}</header>;
};
Header.defaultProps = {
  title: "Default title",
};
export default Header;

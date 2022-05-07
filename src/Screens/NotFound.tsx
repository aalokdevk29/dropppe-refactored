import React from "react";
import { HeaderConatiner } from "../Layout";

const NotFound: React.FC = () => {
  return (
    <div>
      <HeaderConatiner />
      <h3 className="notFoundContainer">OOPS! you are on wrong URL</h3>
    </div>
  );
};

export default NotFound;

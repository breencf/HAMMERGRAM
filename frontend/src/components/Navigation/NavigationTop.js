import { FaCamera, FaCommentDots } from "react-icons/fa";
import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SearchBar from "../SearchPage/SearchBar";

export const NavigatonTop = () => {
  const location = useLocation();

  console.log(location.pathname);

  const split = location.pathname.split("/");

  return (
    <nav className="nav-top">
      {location.pathname === "/" && (
        <>
          <FaCamera />
          <Link to="/">
            <img
              className="logo"
              src="https://hammergram.s3.amazonaws.com/icons/hammergram-logo.png"
            />
          </Link>
          <FaCommentDots />
        </>
      )}
      {location.pathname !== "/" && !Number.isInteger(parseInt(split[split.length -1])) &&  split[split.length-1] !== "search" && <><div></div><h1>{split[split.length - 1]}</h1><div></div></>}
      {split[split.length - 1] === "search" && <><div></div><SearchBar/><div></div></>}
    </nav>
  );
};

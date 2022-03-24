import { FaCamera, FaCommentDots, FaGithub, FaLinkedin } from "react-icons/fa";
import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SearchBar from "../SearchPage/SearchBar";
import { useSelector } from "react-redux";
import { BackButton } from "./BackButton";

export const NavigatonTop = () => {
  const location = useLocation();
  const { username } = useSelector((s) => s.users.profile);

  const split = location.pathname.split("/");

  return (
    <nav className="nav-top">
      {location.pathname === "/" && (
        <>
          <a target="_blank" href="https://www.github.com/breencf">
            <FaGithub />
          </a>
          <Link to="/">
            <img
              className="logo"
              src="https://hammergram.s3.amazonaws.com/icons/hammergram-logo.png"
            />
          </Link>
          <a target="_blank" href="https://www.linkedin.com/in/breencf">
            <FaLinkedin />
          </a>
        </>
      )}
      {location.pathname !== "/" &&
        !Number.isInteger(parseInt(split[split.length - 1])) &&
        split[split.length - 1] !== "search" && (
          <>
            <div>
              <BackButton />
            </div>
            <h4>{split[split.length - 1]}</h4>
            <div></div>
          </>
        )}
      {split[split.length - 1] === "search" && (
        <>
          <div></div>
          <SearchBar />
          <div></div>
        </>
      )}
      {split[split.length - 2].toLowerCase() === "users" && (
        <>
          <div>
            <BackButton />
          </div>
          <h4>{username}</h4>
          <div></div>
        </>
      )}
      {split[split.length - 2] === "posts" && (
        <>
          <div>
            <BackButton />
          </div>
          <h4>Photo</h4>
          <div></div>
        </>
      )}
    </nav>
  );
};

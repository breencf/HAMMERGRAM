import {
  FaHome,
  FaPlusSquare,
  FaRegCompass,
  FaHeart,
  FaCommentDots,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import "./Navigation.css";
import { useSelector } from "react-redux";

export const NavigationBottom = () => {
  return (
    <nav>
      {/* <h2>Hammergram</h2> */}
      <FaHome />
      <FaSearch />
      <FaPlusSquare />
      <FaHeart />
      <FaUserCircle />
    </nav>
  );
};

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
import {Link} from 'react-router-dom'

export const NavigationBottom = () => {
  return (
    <nav className="nav-bottom">
      {/* <h2>Hammergram</h2> */}
      <Link to="/"><FaHome /></Link>
      <FaSearch />
      <FaPlusSquare />
      <FaHeart />
      <FaUserCircle />
    </nav>
  );
};

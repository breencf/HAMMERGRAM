import {
  FaHome,
  FaPlusSquare,
  FaRegCompass,
  FaHeart,
  FaCommentDots,
  FaPersonBooth
} from "react-icons/fa";
import "./Navigation.css"

export const Navigation = () => {
  return (
    <nav>
      <h2>Hammergram</h2>
      <FaHome />
      <FaCommentDots />
      <FaPlusSquare />
      <FaRegCompass />
      <FaHeart />
      <FaPersonBooth/>
    </nav>
  );
};

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
import {Modal} from 'react-modal'
import {useState} from 'react'
import { SimpleCreateForm } from "./SimpleCreateForm";



export const NavigationBottom = () => {

  return (
    <>
    <nav className="nav-bottom">
      {/* <h2>Hammergram</h2> */}
      <Link to="/"><FaHome /></Link>
      <FaSearch />
      <Link to="/create"><FaPlusSquare /></Link>
      <FaHeart />
      <FaUserCircle />
    </nav>
    </>
  );
};

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
  const sessionUser = useSelector((s) => s.sessions.user)
  return (
    <>
    <nav className="nav-bottom">
      {/* <h2>Hammergram</h2> */}
      <Link to="/feed"><FaHome /></Link>
      <Link to="/search"><FaSearch /></Link>
      <Link to="/create"><FaPlusSquare /></Link>
      <Link to="/activity"><FaHeart /></Link>
      <Link to={`/users/${sessionUser.id}`}><FaUserCircle /></Link>
    </nav>
    </>
  );
};

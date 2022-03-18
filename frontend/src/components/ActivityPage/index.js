import { Link } from "react-router-dom";
import { FaHeart, FaRegTimesCircle } from "react-icons/fa";
import { LikeButton } from "../LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAComment, loadOnePost } from "../../store/posts";
import { useState, useEffect } from "react";
import { loadActivity } from "../../store/user";
import { ActivityCard } from "./ActivityCard";
import "./ActivityCard.css"

export const ActivityPage = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((s) => s.sessions.user);
  const {activity}  = useSelector((s) => s.users);
  console.log(id);


  useEffect(() => {
    dispatch(loadActivity(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(activity)
  }, [activity]);

  return (
    <div className="activity-page">
      {activity.map((eve) => {
        return <ActivityCard activity={eve}/>
      })}
    </div>
  );
};
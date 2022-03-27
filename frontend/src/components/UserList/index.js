import {useState, useEffect} from 'react'
import { UserCard } from './UserCard.js';
import {useLocation, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { loadFollowers, loadFollowing } from '../../store/user.js';
import { loadOnePost } from '../../store/posts.js';

export const UserList = () => {
  const [toBeMapped, setToBeMapped] = useState([]);
  const {id} = useParams()
  const dispatch = useDispatch()
  const location = useLocation()
  const followers = useSelector((s) => s.users.profileFollowers);
  const following = useSelector((s) => s.users.profileFollowing)
  const likes = useSelector((s) => s.posts.current)?.Likes;



  const url = location.pathname.split("/")[location.pathname.split("/").length -1]


  useEffect(() => {
    if(url ==="followers") dispatch(loadFollowers(id))
    if(url ==="following") dispatch(loadFollowing(id))
    if(url ==="likes") dispatch(loadOnePost(id))
  }, [url])

  // const likingUsers = likes?.map((obj) => obj.User)

  useEffect(() => {if(url === "followers") setToBeMapped(followers)}, [followers])
  useEffect(() => {if(url === "following") setToBeMapped(following)}, [following])
  useEffect(() => {if(url === "likes") setToBeMapped(likes?.map((obj) => obj.User))}, [likes])





  return <div>
    { toBeMapped && toBeMapped.length === 0 && <div className='empty-list'><p>This list of {url} is empty....</p></div>}
      {toBeMapped?.map((obj) => {
          return <UserCard key= {obj.id} user={obj}/>
      })}
  </div>;
};

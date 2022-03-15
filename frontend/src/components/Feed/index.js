import {useDispatch, useSelector} from 'react-redux'
import { loadPosts } from '../../store/posts'
import { useEffect } from 'react'
import { Post } from './Post'
import "./Feed.css"



export const Feed = () => {
    const dispatch = useDispatch()
    const posts = useSelector((s) => s.posts.feed)
    useEffect(() => {dispatch(loadPosts())},[dispatch])

    console.log(posts)

    return(
        <div className='feed'>
        {posts.map((content) => {return <Post key={content.id} content={content}/> })}
        </div>
    )
}

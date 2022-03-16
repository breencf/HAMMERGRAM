import { useEffect } from 'react'
import {FaGear} from 'react-icons/fa'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadProfile } from '../../store/user'


export const UserProfile = () => {
    const {id} = useParams()
    let user = null
    const dispatch = useDispatch()
    const profileUser = useSelector((s) => s.users)

    useEffect(()=> {
        dispatch(loadProfile(id))
    }, [dispatch, id])

    useEffect(()=> {if(profileUser) user=profileUser}, [profileUser])

    return(
        <>
        {user && <div>
            <div className="profile-top">
                <img className="profile-user" src={user.image}/>
            </div>
            <div className="profile-header">
                <h3>{user.username}</h3>
            </div>
        </div>}
        </>
    )
}

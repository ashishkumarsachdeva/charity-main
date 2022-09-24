import React, { useState, useEffect } from 'react'
import { userProfile } from '../../api/auth'
import { isAuthenticate } from '../../api/auth';
import ShowImage from '../ShowImage/ShowImage.js'

const Conversation = ({ conversation, userId }) => {

    const { token } = isAuthenticate();

    //state
    const [user, setUser] = useState(null);

    //load user info
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== userId)
        userProfile(friendId, token).then(data => {
            setUser(data);
        })
    }, []);



    return (
        <div className='d-flex chatInfo'>
             <ShowImage id={user ? user._id : ""} type='user' /> 
            <p>{user ? ` ${user.firstname} ${user.lastname}` : ""}</p>
        </div>
    )
}

export default Conversation
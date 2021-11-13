import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({username, caption, imageUrl}){
    return(
        <div className ="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}// potentially change
                    src="/static/images/avatar/1.jpg"
                    />
                <h3> {username} </h3>
            </div>

            {/* head -> avatar + username*/}

            {/* TODO
            *  CHANGE IMAGE TO AUDIO FILE 
            */}
            <img className="post__image" src={imageUrl}></img>
            {/*image */}

            <h4 className="post__text"><strong>{caption}</strong></h4>
            {/*username + caption */}

        </div>
    )
}

export default Post
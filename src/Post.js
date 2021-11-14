import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({username, caption, audioUrl}){
    return(
        <div className ="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                    />
                <h5>{caption}</h5>
            </div>

            <audio controls style={{ width: "100%"}}>
                <source className="post__audio" src={audioUrl} type="audio/mp3"></source>
            </audio>           

        </div>
    )
}

export default Post
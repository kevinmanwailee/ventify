import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post(){
    return(
        <div className ="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="test"// potentially change
                    src="/static/images/avatar/1.jpg"
                    />
                <h3> Username </h3>
            </div>

            {/* head -> avatar + username*/}

            {/* TODO
            *  CHANGE IMAGE TO AUDIO FILE 
            */}
            <img className="post__image" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"></img>
            {/*image */}

            <h4 className="post__text"><strong>cleverqazi</strong></h4>
            {/*username + caption */}

        </div>
    )
}

export default Post
import React from 'react';
import './Post.css';

function Post(){
    return(
        <div>
            <h3> Username </h3>
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
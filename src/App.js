import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db } from './Firebase';

function App() {
  // used to store posts
  // posts is a variable
  const [posts, setPosts] = useState([]);
  
  // useEffect: Runs a piece of cod ebased on a specific condition
  // [] = conditions, blank -> runs the page once per refresh
  // snapshot: everytime the db changes
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // runs everytime a post is added
      setPosts(snapshot.docs.map(doc => doc.data()));
    })
  }, [])

  return (
    <div className="app">
      <div className="app__header">
        <img 
          className="app_headerImage"
          /* TODO:
          *  Change LOGO
          */
          src=""
          alt=""
          ></img>
      </div>


      <h1> Hello clever programmers Let's build an instagram clone with react</h1>

      {
        posts.map(post =>(
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}></Post>
        ))
      }
      {/*Posts */}
      {/*Posts */}
    </div>
  );
}

export default App;

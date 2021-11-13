import React from 'react';
import './App.css';
import Post from './Post';
function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img 
          className="app_headerImage"
          /* TODO:
          *  Change LOGO
          */
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          ></img>
      </div>


      <h1> Hello clever programmers Let's build an instagram clone with react</h1>

      
      <Post />
      {/*Posts */}
      {/*Posts */}
    </div>
  );
}

export default App;

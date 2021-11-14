import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './Post';
import { db, auth } from './Firebase';
import Modal from '@material-ui/core/Modal';
import { Button, Input, MuiThemeProvider, createMuiTheme  } from '@material-ui/core';

import { Backup as UploadIcon } from "@material-ui/icons";
import AudioUpload from './AudioUpload';
import logo from './ventify.png';

function App() {
  // used to store posts
  // posts is a variable
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const greenTheme = createMuiTheme({ palette: {
      primary: {
        main:'#284b41'
      },
      secondary:{
        main:'#cc4949'
      }
    }
  })


  // Checks user login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // logged in 
        console.log(authUser);
        setUser(authUser);
      }else{
        // logged out
        setUser(null);
      }
    })
    return () => {
      // perform cleanup action
      unsubscribe();
    }
  }, [user, username]);
  
  // useEffect: Runs a piece of cod ebased on a specific condition
  // [] = conditions, blank -> runs the page once per refresh
  // snapshot: everytime the db changes
  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      // runs everytime a post is added
      setPosts(snapshot.docs.map((doc, index) => doc.data({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

  useEffect(() => {
    console.log(posts);
  }, [posts])


  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn= (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <MuiThemeProvider theme={greenTheme}>
    <div className="app">

      {/*If no user is active, don't break*/}
      {user?.displayName ?(
        <Modal
          open={openUpload}
          onClose={() => setOpenUpload(false)}
          >
            <div className="modal-overlay">
              <div className="modal-card">
                <AudioUpload username={user.displayName} onClose={() => setOpenUpload(false)}/>
              </div>
            </div>
        </Modal>
      ): (
        <></>
      )}
      
        
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="modal-overlay">
          <div className="modal-card">
          <form className="app__signup">
            <center>
              <div>
                <img 
                  style={{width:"100%", height:"auto"}}
                  className="app__headerImage"
                  src={logo}
                  alt=""
                />
              </div>
            </center>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <Button onClick={signUp}>Submit</Button>
          </form>
        </div>
        </div>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >

        <div className="modal-overlay">
          <div className="modal-card">
            <form className="app__signup">
              <center>
                <div>
                  <img 
                    style={{width:"100%", height:"auto"}}
                    className="app__headerImage"
                    src={logo}
                    alt=""
                  />
                </div>
              </center>
              
              <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              <Button onClick={signIn}>Sign In</Button>
            </form>
          </div>
        </div>
      </Modal>
      <div className="app__header">
        <img 
          className="app_headerImage"
          
          src={logo}
          alt=""
          ></img>
      {user? (
        <>
          <div>
            <Button
              startIcon={<UploadIcon/>}
              color="primary"
              variant="contained"
              onClick={() => setOpenUpload(true)}
              >
                Upload
            </Button>
          </div>
          <div style={{width:"271px", textAlign:"right"}}>
            <Button variant="contained" color="secondary" onClick={() => auth.signOut()}>Logout</Button>
          </div>
          </>
      ): (
        <div style={{ display:"flex", flexDirection:"row"}}>
          <div style={{marginRight:"5px"}}>
            <Button variant="contained" color="primary" onClick={() => setOpenSignIn(true)}>Log in</Button>
          </div>
          <div style={{marginLeft:"5px", background:"white", borderRadius: "5px" }}>
            <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>Sign up</Button>
          </div>
        </div>
      )}
      </div>
      <div className="post-center">
      {
        posts.map((post, index) =>(
          <Post key={index} username={post.username} caption={post.caption} audioUrl={post.audioUrl} ></Post>
        ))
      }
    </div>
    </div>
    </MuiThemeProvider>
  );
}

export default App;

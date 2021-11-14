import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './Post';
import { db, auth } from './Firebase';
//import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import AudioUpload from './AudioUpload';

/*function getModalStyle(){
  const top = 50;
  const left = 50;

  return {
    top: {top},
    left: {left},
    transform: 'translate(-{top}, -{left})',
  };
}

// Configure Modal
const useStyles = makeStyles((theme) => ({
  paper: {
    posistion: 'absolute',
    //top: '50%',
    //left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));*/

function App() {
  //const classes = useStyles();
  //const [modalStyle] = useState(getModalStyle);
  // used to store posts
  // posts is a variable
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
    db.collection('posts').onSnapshot(snapshot => {
      // runs everytime a post is added
      setPosts(snapshot.docs.map((doc, index) => doc.data({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

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
    <div className="app">

      {/*Caption input */}
      {/*File picker */}
      {/*Post button */}

      {/*If no user is active, don't break*/}
      {user?.displayName ?(
        <AudioUpload username={user.displayName}/>

      ): (
        <h3>Login to upload</h3>
      )}
      
        
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        {/* <div style={modalStyle} className={classes.paper}> */}
        <div className="modal-overlay">
          <div className="modal-card">
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
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
                <img 
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
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
          /* TODO:
          *  Change LOGO
          */
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          ></img>
      </div>
      {user? (
        <Button onClick={() => auth.signOut()}>Logout</Button>

      ): (
        <div>
          <Button onClick={() => setOpenSignIn(true)}>Log in</Button>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      )}


      <h1> Ventify</h1>

      {
        posts.map((post, index) =>(
          <Post key={index} username={post.username.username} caption={post.caption} audioUrl={post.audioUrl}></Post>
        ))
      }
      {/*Posts */}
      {/*Posts */}
    </div>
  );
}

export default App;

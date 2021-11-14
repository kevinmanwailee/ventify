import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle(){
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
    transform: 'translate(50%, 50%)',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
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
      setPosts(snapshot.docs.map(doc => doc.data({
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
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <Button onClick={signUp}>Submit</Button>
          </form>
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

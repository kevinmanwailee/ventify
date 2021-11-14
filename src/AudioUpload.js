import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, db } from "./Firebase";
import firebase from "firebase/compat/app";
import "firebase/compat"

function AudioUpload(username){
    const [audio, setAudio] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    // Select only 1 file
    const handleChange = (e) => {
        if(e.target.files[0]){
            setAudio(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`audios/${audio.name}`).put(audio);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Progress Bar
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Error Message
                console.log(error);
                alert(error.message);
            },
            () => {
                // Finished
                storage
                    .ref("audios")
                    .child(audio.name)
                    .getDownloadURL()
                    .then(url =>{
                        // post audio file inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            audioUrl: url,
                            username: username,
                        });
                        
                        // Reset upload prompts
                        setProgress(0);
                        setCaption("");
                        setAudio(null);
                    })

            }
        )
    }

    return(
        <div>
            <progress  value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption ..." onChange={event => setCaption(event.target.value)} ></input>
            <input type="file" onChange={handleChange}></input>

            {/* Material UI Button*/}
            <Button className="audioupload__button" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default AudioUpload;
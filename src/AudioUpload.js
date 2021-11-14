import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Backup as UploadIcon } from "@material-ui/icons";
import { storage, db } from "./Firebase";
import firebase from "firebase/compat/app";
import "firebase/compat"

function AudioUpload(props){
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
                    .then(async url =>{
                        // post audio file inside db
                        await db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            audioUrl: url,
                            username: props.username,
                        });
                        
                        // Reset upload prompts
                        setProgress(0);
                        setCaption('');
                        setAudio(null);

                        props.onClose();
                        window.location.reload();
                    })

            }
        )
    }

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <input style={{ width: "80%", marginBottom: "10px"}} type="text" placeholder="Enter a caption ..." onChange={event => setCaption(event.target.value)} ></input>
            <input style={{marginBottom: "10px"}}type="file" onChange={handleChange}></input>

            <Button
            startIcon={<UploadIcon/>}
            color="primary"
            variant="contained"
            onClick={handleUpload}
            >
              Upload
            </Button>
            <progress value={progress} max="100" style={{ width: "100%", marginTop:"10px" }}/>
        </div>
    )
}

export default AudioUpload;
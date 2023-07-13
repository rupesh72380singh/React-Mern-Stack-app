import React, { useState, } from "react";
import NoteContext from "./noteContext";
// import {useState} from "react"
const NoteState =(props)=>{
  const host = "http://localhost:5000"
    const notesinitial = []
        // [
        //     {
        //       "_id": "64993bb2347488b2cc37fe72",
        //       "title": "my titlee",
        //       "description": "please wake up",
        //       "tag": "personal",
        //       "date": "2023-06-26T07:18:10.081Z",
        //       "__v": 0
        //     },
        //     {
        //       "_id": "64993d217f0e99b2734bc6fe",
        //       "title": "my title",
        //       "description": "please wakes up",
        //       "tag": "personal1",
        //       "date": "2023-06-26T07:24:17.336Z",
        //       "__v": 0
        //     },
        //     {
        //       "_id": "64998acedf8f18c22042332b",
        //       "title": "newpaeq",
        //       "description": "newspaper s saying somr",
        //       "tag": "wis ",
        //       "date": "2023-06-26T12:55:42.671Z",
        //       "__v": 0
        //     }
        //   ]
        const [notes , setnotes] = useState(notesinitial)
    // const s1 ={
        // "name":"rupeh",
        // "class":"5b"

    // }
    // const [ state, setstate] = useState(s1);
    // const update = ()=>{
        // setTimeout(() => {
            // setstate({
                // "name":"harry",
                // "class":"10b"
            // })
            
        // }, 1000);
        // get all note a note
        const getNotes =async()=>{
          // Api call
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 

            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjg3NzYwNzYyfQ.3eqWq2iI6BNqWzyPgizfERaoJ1UNN4589oie2CUD82A"
            },
      
            // body: JSON.stringify({}), 
          });
          const json = await response.json();
          console.log(json);
          setnotes(json)
        } 
          





        //   console.log("adding a new note")
        //   const note =             {
        //     "_id": "64998acedf8f18c22042332b",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2023-06-26T12:55:42.671Z",
        //     "__v": 0
        //   }
        //   setnotes(notes.concat(note))
        // }
        
        const addNote =async(title , description, tag)=>{
          // Api call
          const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", 

            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjg3NzYwNzYyfQ.3eqWq2iI6BNqWzyPgizfERaoJ1UNN4589oie2CUD82A"
            },
      
            body: JSON.stringify({title , description , tag}), 
          });
          const note = await response.json(); 
          setnotes(notes.concat(note));
          





          // console.log("adding a new note")
          // const note = json;
          // const note =             {
          //   "_id": "64998acedf8f18c22042332b",
          //   "title": title,
          //   "description": description,
          //   "tag": tag,
          //   "date": "2023-06-26T12:55:42.671Z",
          //   "__v": 0
          // }
          setnotes(notes.concat(note))

        }

        // delete a node
        const deleteNote=async(id)=>{
          // Api call
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", 

            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjg3NzYwNzYyfQ.3eqWq2iI6BNqWzyPgizfERaoJ1UNN4589oie2CUD82A"
            },
      
            // body: JSON.stringify({}), 
          });
          const json = await response.json(); 
          console.log({json})
          


          console.log("deleting the notes with id" +id);
          const newNotes= notes.filter((note)=>{return note._id!==id})
          setnotes(newNotes);

        }


        // edit a note
        const editNote= async(id ,title,description , tag)=>{
          // Apicall
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", 

            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjg3NzYwNzYyfQ.3eqWq2iI6BNqWzyPgizfERaoJ1UNN4589oie2CUD82A"
            },
      
            body: JSON.stringify({title , description, tag}), 
          });
          const json = await response.json();
          console.log(json)
          
          let NewNotes = JSON.parse(JSON.stringify(notes))
          
          for(let index = 0; index < notes.length; index++){
            const element = notes[index];
            if(element._id ===id){
              NewNotes[index].title=title;
              NewNotes[index].description=description;
              NewNotes[index].tag=tag;
              break;

            }
          }
          setnotes(NewNotes)
        }
        return (
        // <NoteContext.Provider value={{state , update}}>
        <NoteContext.Provider value={{notes , addNote ,deleteNote, editNote , getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )}

export default NoteState;
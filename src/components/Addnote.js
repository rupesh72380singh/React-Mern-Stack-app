import { useState } from "react";
import noteContext from '../context/notes/noteContext';
import React,{useContext} from 'react'



const Addnote = () => {
    const context = useContext(noteContext)
    // const {notes , setnotes} = context
    const { addNote} = context
    const[note , setNote] = useState({title:"" , description :"", tag:""})

    const handleonClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.title);
        setNote({title:"" , description :"", tag:""})

    }
    const onChange= (e)=>{
        setNote({...note ,[e.target.name]: e.target.value})

    }
  return (
    <div>
      <h1>Add Notes</h1>
      <div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            id="title" name="title"
            aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
        </div>
        <div class="mb-3">
          <label for="desc" class="form-label">Description</label>
          <input
          type="text"class="form-control"id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/></div>
      
        <div class="mb-3">
          <label for="tag" class="form-label">Tag</label>
          <input
          type="text"class="form-control"id="tag" name="tag" value={note.tag}  onChange={onChange} minLength={5} required/></div>
      
        <form>
        <button disabled={note.title.length<5 } type="submit" class="btn btn-primary"value={note} onClick={handleonClick}>
          AddNote
        </button>
      </form>
      {/* <Notes /> */}
      </div>
      </div>
  );
};

export default Addnote;

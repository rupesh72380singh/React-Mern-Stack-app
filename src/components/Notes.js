import React,{useContext , useEffect , useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';


const Notes = () => {
    const context = useContext(noteContext)
    // const {notes , setnotes} = context
    // const {notes , addNote} = context
    const {notes ,getNotes, editNote} = context
    useEffect(()=>{
      getNotes()

    } ,[])
    const updateNote= (currentNote)=>{
      ref.current.click();
      setNote({id: currentNote._id ,etitle:currentNote.title , edescription: currentNote.description , etag:currentNote.tag });

    }
    const ref = useRef(null)
    const refClose = useRef(null)
    const[note , setNote] = useState({ id :"",etitle:"" , edescription :"", etag:""})

    const handleonClick=(e)=>{
      console.log("updating the notes...")
      refClose.current.click();
      // setNote({etitle:"" , edescription :"", etag:"default"})

      editNote(note.id, note.etitle, note.edescription, note.etag)
      // e.preventDefault();
      // addNote(note.etitle, note.edescription, note.etitle);

  }
  const onChange= (e)=>{
      setNote({...note ,[e.target.name]: e.target.value})

  }
  return (
    <>
    <Addnote/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-etitle fs-5" id="exampleModalLabel">Modal etitle</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">etitle </label>
          <input type="text"
            className="form-control"
            id="etitle" name="etitle"
            aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label for="sakldak" className="form-label">edescription</label>
          <input
          type="text"className="form-control"id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/></div>
      
        <div className="mb-3">
          <label for="nikhil" className="form-label">etag</label>
          <input
          type="text"className="form-control"id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required/></div>
          </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleonClick} type="button" className="btn btn-primary">update Note</button>
            {/* </div> */}
            </div>
          </div> 
        </div>
      </div>
        <div className='row my-3'>
            <h2>Your Notes</h2>    
            <div className="container mx-2">
              {notes.length===0 && 'No Need to display'}
            </div>

            {notes.map((note)=>{
                return <NoteItem key = {note._id} updateNote={updateNote} note={note}/>
              
          })}
              

      
    </div>
    </>
  )
}

export default Notes

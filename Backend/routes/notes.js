const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose')




// route1 fetch the all notes using get /api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser, async (req ,res)=>{
    try{
    const notes = await Note.find({user:req.user.id});
    res.json(notes)
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})
// route 2 add note using post /api/notes/addnote
router.post('/addnote',fetchuser,[
    body('title', "enter the valid title").isLength({ min: 3}),
    body('description', " description must be at least 5").isLength({ min: 5}),
], async (req ,res)=>{
    try{
    const{title , description , tag} = req.body;
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const note = new Note({
        title, description , tag ,user:req.user.id
    })
    const saveNote = await note.save();
    res.json(saveNote)
}catch(error){
    console.error(error.message);
    res.status(500).send("some error occured")
}


})
// route 3 update teh note using updatenote /api/notes/updatenode
router.put('/updatenote/:id',fetchuser, async (req ,res)=>{
    const { title , description , tag} = req.body;
    // create a newNote object
    const newNotes = {}
    if(title){newNotes.title = title}
    if(description){newNotes.description = description}
    if(tag){newNotes.tag = tag}
    // find the note to be updateand updated it
    let note = await Note.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found");}
    note.user=String;

    if(note.user !== req.user.id){return res.status(401).send("not allowed");}

    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNotes} , {new:true});
    res.json({ note});

}
)

// route 4 delete notes  using deletenote /api/notes/deletenode
router.delete('/deletenote/:id',fetchuser, async (req ,res)=>{
    const { title , description , tag} = req.body;
    // create a newNote object
    const newNotes = {}
    if(title){newNotes.title = title}
    if(description){newNotes.description = description}
    if(tag){newNotes.tag = tag}
    // find the note to be updateand updated it
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");}
    note.user= String;

    if(note.user !== req.user.id){
        return res.status(401).send("not allowed");}

    note = await Note.findByIdAndDelete(req.params.id, {$set:newNotes} , {new:true});
    res.json({note});
}
)


module.exports = router
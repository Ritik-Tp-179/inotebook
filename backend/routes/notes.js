const express = require("express")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');


// Route 1: Fetch all noteusing GET"/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {

        const note = await Notes.find({ user: req.user.id })
        res.json(note)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error somthing in notes")
    }
})


// Route 2: Add a new note using Get"/api/notes/addnote". Login required
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({min:5}),
    body("description", "Description must be atleast 8 chracter").isLength({min:5})
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save()
        res.json(savednote)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error somthing in notes")
    }
    // all notes fetched
})

// Route 3: Updating a existing note using PUT"/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not found user") }
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json(note)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error somthing in notes")
    }
    // all notes fetched
})

// Route 4: Deleting a existing note using DELETE"/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // const {title, description, tag} = req.body

        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not found ") }

        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"Note Deleted","note":note})

    } catch (error) {
        console.log(error)
        res.status(500).send("Error something in notes")
    }
    // all notes fetched
})
module.exports = router
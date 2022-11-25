const express = require('express')
const router = express.Router();
const Notes = require('../models/Notes') // creates acutally a collection in database
const fetchUserIdFromJWT = require('../middleware/fetchUserIdFromJWT')
const { body, validationResult } = require('express-validator');

router.get('/fetchAllNotes', fetchUserIdFromJWT, async (req, res) => {
    // const notes = await Notes.find({ user_id: req.user.id })

    res.json( await Notes.find({ user_id: req.user.id }) )
})



router.post('/addnotes',fetchUserIdFromJWT, [
    body('title', "title should be min 3 character").isLength({ min: 3 }),
    body('description', "description should be min 5 character").isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let {title, description, tag} = req.body;
        let notes = new Notes({
            user_id : req.user.id,
            title,
            description, 
            tag
            // password: req.body.password,
        })
        const savednotes = await notes.save()
    
        res.json({ savednotes })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : error.message});
    }
})

router.put('/updateNote/:id',fetchUserIdFromJWT, [
    body('title', "title should be min 3 character").isLength({ min: 3 }),
    body('description', "description should be min 5 character").isLength({ min: 5 })
],async(req,res)=>{
    try{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    const {title, description, tag } = req.body;
    const newNote = {}
    if(title) {newNote.title = title}
    if(description) {newNote.description = description}
    if(tag) {newNote.tag = tag}

    // validate note_id
    const note = await Notes.findById(req.params.id)
    if (!note){return res.status(404).send('not found')}
    // if available then validate user_id
    if (note.user_id.toString() !== req.user.id) {
        return res.status(404).send('not allowed')
    }
    console.log(newNote)
    console.log(note)
    const updatednote = await Notes.findByIdAndUpdate(note._id,{$set : newNote}, {new: true})
    // console.log("i am just before undateone method;"
    // )
    // await note.updateOne(newNote)
    res.json(updatednote)
} catch(error){
    return res.json({error: error.message})
}
})

router.delete('/delete/:id',fetchUserIdFromJWT, async (req,res)=> {
    // validate
    try {
        const note = await Notes.findById(req.params.id)
        if(!note) {
            return res.status(404).send('not found')
        }
        // if found validate user
        if (req.user.id !== note.user_id.toString()){
            return res.status(404).send('not allowed')
        }


        const deleted_note = await Notes.findByIdAndDelete(req.params.id);

        return res.send({deleted_note})
    } catch (error) {
        return res.status(500).send("Internal Server Error!")
    }

})
module.exports = router;
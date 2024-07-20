const Notes = require('../models/NotesSchema');

const CreateNote = async (req, res) => {
    try {
        const { title, desc} = req.body;
        if (!title || !desc) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!req.user) {
            console.log('User not found in request');
            return res.status(401).json({ message: 'Unauthorized', success: false });
        }

        userId  = req.user.username; 
      
        const note = new Notes({ title, desc,userId}); // Save username if needed
        await note.save();

        // res.status(201).send("/notes");
        res.status(201).send('done');

    } catch (err) {
        console.log('Error in CreateNote:', err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const DeleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await Notes.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Note Deleted Successfully!',
            success: true
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const UpdateNote = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { id } = req.params;

        const updatedNote = await Notes.findOneAndUpdate(
            { _id: id },
            { title, desc },
            { new: true }
        );

        res.status(200).send("/notes");

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const AllNotes = async (req, res) => {
    try {
        const {username} = req.user;
        const notes = await Notes.find({ userId: username });
        res.status(200).json(notes);
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const NoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const noteById = await Notes.findById(id);
        res.status(200).json(noteById);
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = { CreateNote, DeleteNote, UpdateNote, AllNotes, NoteById };

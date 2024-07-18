const Notes = require('../models/NotesSchema');

const CreateNote = async (req,res) =>{
   try{
     const {title,desc,userId} = req.body;
     if (!title || !desc || !userId) {
        return res.status(400).json({ message: 'All fields are required' });
    }  

    const Note = new Notes({title,desc,userId});
    await Note.save();
    res.status(201).json({
        message: 'Note Created',
        success: true
    });

   }catch(err){
    console.log(err);
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

        res.status(200).json({
            message: 'Note Updated Successfully!',
            success: true,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

const AllNotes = async (req,res) =>{
    try{
         const notes = await Notes.find();
         res.status(200).json(notes);
    }catch(err){
        return res.status(500).json({
            message :"Internal error",
            success : false
        });
    }
}

const NoteById = async (req,res)=>{
   try{
           const {id} = req.params;  
           const notebyid = await Notes.findById(id);
           res.status(200).json(notebyid);
   }catch(err){
    return res.status(500).json({
        message :"Internal error",
        success : false
    });
   }
}

module.exports = {CreateNote,DeleteNote,UpdateNote,AllNotes,NoteById};
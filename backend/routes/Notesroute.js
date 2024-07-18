const express = require('express');
const Notes = require('../controllers/NotesController.js');


const router = express.Router();

router.route('/create').post(Notes.CreateNote);
router.route('/notes').get(Notes.AllNotes);
router.route('/notes/:id').get(Notes.NoteById);
router.route('/notes/:id/delete').delete(Notes.DeleteNote);
router.route('/notes/:id/update').put(Notes.UpdateNote);

module.exports = router;


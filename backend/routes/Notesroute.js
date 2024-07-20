const express = require('express');
const Notes = require('../controllers/NotesController.js');
const  {jwtAuthMiddleware, generateToken}= require('../config/auth.js');

const router = express.Router();

router.route('/create').post(jwtAuthMiddleware,Notes.CreateNote);
router.route('/notes').get(jwtAuthMiddleware,Notes.AllNotes);
router.route('/notes/:id').get(Notes.NoteById);
router.route('/notes/:id/delete').delete(jwtAuthMiddleware,Notes.DeleteNote);
router.route('/notes/:id/update').put(jwtAuthMiddleware,Notes.UpdateNote);

module.exports = router;


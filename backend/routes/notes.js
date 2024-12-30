const express = require("express");
const fetchUser = require("../Middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult, header } = require("express-validator");
const router = express.Router();

//Route 1:Get all Notes using: GET "/api/notes/fetchAllNotes".login required.
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.json(notes);
});
//Route 2 :Add a new  Notes using: Post "/api/notes/addNote".login required.
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid Titile").isLength({ min: 3 }),
    body(
      "description",
      "Description must contain atleast 5 characters "
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      // If there are errors, return Bad request and the error
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!!");
    }
  }
);

//Route 3:Updating the exixting note using: PUT "/api/notes/updateNote". login required.
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the node to be updated and update it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!!");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!!");
  }
});

//Route 4: Delete the exixting note using:DELETE "/api/notes/deleteNote". login required.
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  
  try {
    //Find the node to be deleted and delete it.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    //Allow deletion only if the user owns this Note.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!!");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted.", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!!");
  }
});

module.exports = router;

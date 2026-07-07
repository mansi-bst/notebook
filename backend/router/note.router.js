const express = require("express");
const verifyAuth = require("../middleware/verifyauth.middleware");
const NoteModel = require("../schema/note.model");
const router = express.Router();

router.post("/create", verifyAuth, async (req, res) => {
  const { title, description, tag, image, isPrivate } = req.body;

  try {
    const note = await NoteModel.create({
      title,
      description,
      tag,
      isPrivate,
      image,
      createdBy: req.user,
    });

    res.status(201).send({
      success: true,
      message: "Note added successfully!",
      note,
    });
  } catch (error) {
    let message = Object.values(error?.errors)[0]?.properties?.message;
    if (!message) message = "Internal Server Error!";

    res.status(500).send({
      success: false,
      message,
      note: null,
    });
  }
});

router.get("/yournotes", verifyAuth, async (req, res) => {
  try {
    const note = await NoteModel.find({ createdBy: req.user }).populate(
      "createdBy",
      "-password",
    );
    // console.log(note)
    res.status(200).send({
      success: true,
      message: "Note fetched successfully!",
      note,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error!",
    });
  }
});

router.get("/public", async (req, res) => {
  console.log("check");
  try {
    console.log("check");
    const note = await NoteModel.find({ isPrivate: false }).populate(
      "createdBy",
      "-password",
    );
    res.status(200).send({
      success: true,
      message: "Note fetched successfully!",
      note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error!",
    });
  }
});

router.put('/update/:noteId', verifyAuth, async (req, res) => {
    const { title, description, tag, image, isPrivate } = req.body;
    const { noteId } = req.params;

    try {
        const note = await NoteModel.findById(noteId)

        if (!note) {
            res.status(404).send({
                success: false,
                message: "Your notes not found!"
            })
        }

        if (title) note.title = title
        if (description) note.description = description
        if (tag) note.tag = tag
        if (image) note.image = image
        if (isPrivate) note.isPrivate = isPrivate

        const updatedNote = await note.save()

        res.status(201).send({
            success: true,
            message: "Note updated successfully!",
            note: updatedNote
        })
    } catch (error) {
        let message = Object.values(error?.errors)[0]?.properties?.message
        if (!message) message = "Internal Server Error!";

        res.status(500).send({
            success: false,
            message,
            note: null
        })
    }

})
router.delete("/delete/:noteId", verifyAuth, async (req, res) => {
  const { noteId } = req.params;

  try {
    const note = await NoteModel.findByIdAndDelete(noteId);
    if (!note) {
      res.status(404).send({
        success: false,
        message: "Your notes not found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Note deleted successfully!",
      note,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error!",
    });
  }
});

module.exports = router;

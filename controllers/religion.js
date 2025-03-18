const { default: mongoose } = require("mongoose");
const Religion = require("../models/religion");

const getReligion = async (req, res, next) => {
  try {
    const religions = await Religion.find({}).sort({ name: 1 });

    return res.status(200).json({
      message: "Religions fetched successfully.",
      data: religions,
    });
  } catch (error) {
    console.error("Error in getReligion:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const postReligion = async (req, res, next) => {
  try {
    const { name, description, isActive } = req.body;

    const religion = new Religion({
      name,
      description,
      isActive: isActive ?? true,
      createdOn: new Date(),
      updatedOn: null,
    });

    const savedReligion = await religion.save();

    return res.status(201).json({
      message: "Religion added successfully.",
      data: savedReligion,
    });
  } catch (error) {
    console.error("Error in postReligion:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteReligion = async (req, res, next) => {
  try {
    const { id } = req.query;

    const religion = await Religion.findByIdAndDelete(id);

    if (!religion) {
      return res.status(404).json({ message: "Religion not found." });
    }

    return res.status(200).json({
      message: "Religion deleted successfully.",
      data: religion,
    });
  } catch (error) {
    console.error("Error in deleteReligion:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updatedReligion = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { name, description, isActive } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const religion = await Religion.findByIdAndUpdate(
      id,
      { updatedOn: new Date(), name, description, isActive },
      { new: true, runValidators: true }
    );

    if (!religion) {
      return res.status(404).json({ message: "Religion not found." });
    }

    return res.status(200).json({
      message: "Religion updated successfully.",
      data: religion,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { updatedReligion };

module.exports = { getReligion, postReligion, deleteReligion, updatedReligion };

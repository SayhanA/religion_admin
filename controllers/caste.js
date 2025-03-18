const Caste = require("../models/caste");

const getCasts = async (req, res, next) => {
  try {
    const casts = await Caste.find().sort({ name: 1 });
    res.status(200).json(casts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postCaste = async (req, res, next) => {
  const casteBody = req.body;

  const newCaste = new Caste({ ...casteBody, createdOn: new Date() });
  try {
    const savedCaste = await newCaste.save();
    res.status(201).json(savedCaste);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCaste = async (req, res, next) => {
  try {
    const { id } = req.query;

    const deletedCaste = await Caste.deleteOne({ _id: id });

    if (deletedCaste.deletedCount === 0) {
      return res.status(404).json({ message: "Caste not found." });
    }

    return res.status(200).json({ message: "Caste deleted successfully." });
  } catch (error) {
    console.error("Error in deleteCaste:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateCaste = async (req, res, next) => {
  try {
    const { id } = req.query;
    const updatedData = req.body;

    console.log({ updatedData });

    const caste = await Caste.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!caste) {
      return res.status(404).json({ message: "Caste not found." });
    }

    return res.status(200).json({
      message: "Caste updated successfully.",
      data: caste,
    });
  } catch (error) {
    console.error("Error in updateCaste:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getCastesByReligion = async (req, res, next) => {
  try {
    const { religionId } = req.query;

    // Validate request
    if (!religionId) {
      return res.status(400).json({ message: "Missing religionId" });
    }

    const castes = await Caste.find({ religionId });

    if (!castes.length) {
      return res
        .status(404)
        .json({ message: "No castes found for this religion" });
    }

    console.log("Fetched Castes:", castes);
    return res
      .status(200)
      .json({ message: "Castes fetched successfully", data: castes });
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getCasts,
  postCaste,
  deleteCaste,
  deleteCaste,
  updateCaste,
  getCastesByReligion,
};

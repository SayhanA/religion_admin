const {
  getCasts,
  postCaste,
  deleteCaste,
  updateCaste,
  getCastesByReligion,
} = require("../controllers/caste");
const validateRequest = require("../middleware/validateRequest");
const {
  createCasteValidation,
  deleteCasteValidation,
  updateCasteValidation,
  getCastesByReligionValidation,
} = require("../validators/castSchema");

const routes = require("express").Router();

// GET all castes
routes.get("/", getCasts);

// POST a new caste
routes.post("/", validateRequest(createCasteValidation), postCaste);

// DELETE a caste
routes.delete("/", validateRequest(deleteCasteValidation), deleteCaste);

// PATCH a caste
routes.patch("/", updateCaste);

// GET castes by religion
routes.get(
  "/getCastesByReligion",
  validateRequest(getCastesByReligionValidation),
  getCastesByReligion
);

module.exports = routes;

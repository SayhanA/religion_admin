const {
  getReligion,
  postReligion,
  deleteReligion,
  updatedReligion,
} = require("../controllers/religion");
const validateRequest = require("../middleware/validateRequest");
const {
  postReligionSchema,
  deleteReligionSchema,
  updateReligionSchema,
} = require("../validators/religionSchema");

const routes = require("express").Router();

routes.get("/", getReligion);

routes.post("/", validateRequest(postReligionSchema), postReligion);

routes.delete("/", validateRequest(deleteReligionSchema), deleteReligion);

routes.patch("/", validateRequest(updateReligionSchema), updatedReligion);

module.exports = routes;

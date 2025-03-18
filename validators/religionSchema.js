const Joi = require("joi");

const postReligionSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required",
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Description is required",
  }),
  isActive: Joi.boolean(),
});

const deleteReligionSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    "string.empty": "Religion ID is required",
  }),
});

const updateReligionSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    "string.empty": "Religion ID is required",
  }),
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  isActive: Joi.boolean(),
});

module.exports = {
  postReligionSchema,
  deleteReligionSchema,
  updateReligionSchema,
};

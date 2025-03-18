const Joi = require("joi");

const createCasteValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required.",
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Description is required.",
  }),
  religionId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "Religion id is required.",
      "string.pattern.base": "Invalid MongoDB ID format.",
    }),
});

const deleteCasteValidation = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "ID is required.",
      "string.pattern.base": "Invalid MongoDB ID format.",
    }),
});

const updateCasteValidation = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "Id is required.",
      "string.pattern.base": "Invalid MongoDB ID format.",
    }),
});

const getCastesByReligionValidation = Joi.object({
  religionId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "religionId is required",
      "string.pattern.base": "Invalid religionId format",
    }),
});

module.exports = {
  createCasteValidation,
  deleteCasteValidation,
  updateCasteValidation,
  getCastesByReligionValidation,
};

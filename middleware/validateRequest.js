const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(
    req.method === "GET" || req.method === "DELETE" ? req.query : req.body,
    { abortEarly: false }
  );

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = validateRequest;

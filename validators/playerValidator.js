const Joi = require("joi");
const playerSchema = Joi.object({
  name: Joi.string().required(),
  team: Joi.string().required(),
  country: Joi.string().required(),
  runs: Joi.number().integer().required(),
  image: Joi.string().uri().required(),
  role: Joi.string().valid("Batsman", "Bowler", "All-rounder").required(),
  salary: Joi.number().positive().required()
});
module.exports = { playerSchema };
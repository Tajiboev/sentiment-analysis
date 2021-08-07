import Joi from "joi";

const analyzeSchema = Joi.object({
	text: Joi.string().required(),
	split: Joi.boolean().sensitive(false).required(),
}).strict();

export { analyzeSchema };

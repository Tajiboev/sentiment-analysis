import Joi from "joi";

const analyzeSchema = Joi.object({
	text: Joi.string().required(),
	splitter: Joi.string(),
});

export { analyzeSchema };

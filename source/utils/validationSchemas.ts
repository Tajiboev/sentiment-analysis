import Joi from "joi";

const analyzeSchema = Joi.object({
	text: Joi.string().required(),
});

export { analyzeSchema };

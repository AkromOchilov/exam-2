import Joi from 'joi';

export let loginSchema = Joi.object({
	username: Joi.string().min(3).required(),
	password: Joi.string().min(8).required(),
});

export let postSchema = Joi.object({
	category: Joi.string().min(2).required(),
	subcategory: Joi.string().min(3).required(),
	format: Joi.string().required(),
	link: Joi.string().uri().messages({
		'string.pattern.base': 'Link format should be https://...',
	}),
	date: Joi.string()
		.regex(/^\d{2}\/\d{2}\/\d{4}$/)
		.messages({
			'string.pattern.base': 'Date format should be DD/MM/YYYY',
		})
		.required(),
	time: Joi.string()
		.regex(/^\d{2}\:\d{2}$/)
		.messages({
			'string.pattern.base': 'Time format should be HH:MM',
		})
		.required(),
	organizator: Joi.string().min(3).required(),
	job: Joi.string().required(),
	contact: Joi.string()
		.regex(/^\+998\d{9}$/)
		.messages({
			'string.pattern.base': 'Date format should be like +998946091300',
		})
		.required(),
	title: Joi.string().required(),
	content: Joi.string().required(),
	name: Joi.string()
		.regex(/\.(jpg|jpeg|png)$/i)
		.messages({
			'string.pattern.base': 'Image extension should be jpg,jpeg or png',
		})
		.required(), // extension check
	size: Joi.number()
		.max(2 * 1024 * 1024)
		.messages({
			'string.pattern.base': 'Image size can not be bigger than 2MB',
		})
		.required(), // 2MB in bytes
});

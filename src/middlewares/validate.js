import { loginSchema, postSchema } from './../utils/validation.js';

export let validate = (req, res, next) => {
	try {
		if (req.url == '/login' && req.method == 'POST') {
			let { error } = loginSchema.validate(req.body);
			if (error) throw Error(error);
			next();
		}

		if (req.url == '/posts' && req.method == 'POST') {
			let { name, size } = req.files?.image;
			let { error } = postSchema.validate({ ...req.body, name, size });

			if (error) throw Error(error);
			next();
		}
	} catch (error) {
		return next(error);
	}
};

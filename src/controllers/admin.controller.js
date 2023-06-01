import { read, write, hashPassword } from '../utils/model.js';
import jwt from './../utils/jwt.js';
import {
	InternalServerError,
	NotFoundError,
	BadRequestError,
} from '../utils/error.js';

let LOGIN = (req, res, next) => {
	try {
		let admins = read('admins');
		let { username, password } = req.body;
		password = hashPassword(password);

		let admin = admins.find(
			(admin) => admin.username == username && admin.password == password,
		);

		if (!admin) {
			return next(
				new BadRequestError(400, 'invalid username or password'),
			);
		}
		delete admin.password;

		res.status(200).json({
			status: 200,
			message: 'successfull',
			access_token: jwt.sign({ adminId: admin.adminId }),
			data: admin,
		});
	} catch (error) {
		next(error);
	}
};

let GET = (req, res, next) => {
	try {
		let { status } = req.query;
		if (!status) status = 'waiting';
		let posts = read('posts')
			.filter((post) => post.status == status)
			.sort((a, b) => b.postId - a.postId);

		res.status(200).json({
			status: 200,
			message: 'success',
			data: posts,
		});
	} catch (error) {
		next(error);
	}
};

let PUT = (req, res, next) => {
	try {
		let posts = read('posts');
		let { status, postId } = req.body;

		let post = posts.find((post) => post.postId == postId);
		if (!post) {
			return next(new NotFoundError(404, 'post not found'));
		}
		post.status = status || post.status;
		write('posts', posts);
		res.status(200).json({
			status: 200,
			message: 'successfully updated',
			data: post,
		});
	} catch (error) {
		return next(new InternalServerError(500, 'InternalServerError'));
	}
};

export default { GET, LOGIN, PUT };

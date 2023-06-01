import { read, write } from '../utils/model.js';
import { resolve } from 'path';
import { NotFoundError, InternalServerError } from '../utils/error.js';

// Get all posts with accepted status
let GET = (req, res, next) => {
	try {
		let posts = read('posts').filter((post) => post.status == 'accepted');
		let { date, subcategory, format, organizator, page } = req.query;
		page = page || process.DEFAULT.pagination.page;
		let limit = process.DEFAULT.pagination.limit;

		date == 'undefined' ? (date = false) : true;
		subcategory == 'undefined' ? (subcategory = false) : true;
		format == 'undefined' ? (format = false) : true;
		organizator == 'undefined' ? (organizator = false) : true;

		let data = posts
			.filter((post) => {
				let a = date ? post.date == date : true;
				let b = subcategory ? post.subcategory == subcategory : true;
				let c = format ? post.format == format : true;
				let d = organizator ? post.organizator == organizator : true;
				return a && b && c && d;
			})
			.slice((page - 1) * limit, page * limit);

		res.status(200).json({
			status: 200,
			message: 'success',
			data: data,
		});
	} catch (error) {
		next(new InternalServerError(500, 'InternalServerError'));
	}
};

//Get single post with accepted status
let GET_SINGLE = (req, res, next) => {
	try {
		let { postId } = req.params;
		let post = read('posts')
			.filter((post) => post.status == 'accepted')
			.find((post) => post.postId == postId);
		if (!post) {
			return next(new NotFoundError(404, 'Post not found'));
		}
		res.status(200).json({
			status: 200,
			message: 'success',
			data: post,
		});
	} catch (error) {
		next(new InternalServerError(500, 'InternalServerError'));
	}
};

// Create post
let POST = (req, res) => {
	try {
		let posts = read('posts');
		console.log('post request');
		let {
			category,
			subcategory,
			format,
			link,
			date,
			time,
			organizator,
			job,
			contact,
			title,
			content,
		} = req.body;
		let { image } = req.files;

		let postImage = Date.now() + image.name.replace(/\s/g, '');
		image.mv(resolve('uploads', postImage));

		let newPost = {
			postId: posts.at(-1)?.postId + 1 || 1,
			category,
			subcategory,
			format,
			link,
			date,
			time,
			organizator,
			job,
			contact,
			title,
			content,
			image: postImage,
			created_at: new Date(),
			status: 'waiting',
		};

		posts.push(newPost);
		write('posts', posts);
		res.status(201).json({
			status: 201,
			message: 'successfully added',
			data: newPost,
		});
	} catch (error) {
		next(new InternalServerError(500, 'InternalServerError'));
	}
};

export default { GET, POST, GET_SINGLE };

import { Router } from 'express';
import postController from '../controllers/post.controllers.js';
import { checkToken } from '../middlewares/checkToken.js';
import { validate } from '../middlewares/validate.js';

let router = Router();

router.get('/posts', postController.GET);
router.get('/posts/:postId', postController.GET_SINGLE);
router.post('/posts', validate, postController.POST);

export default router;

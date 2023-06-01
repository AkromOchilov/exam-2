import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import { checkToken } from '../middlewares/checkToken.js';
import { validate } from '../middlewares/validate.js';

let router = Router();

//Login uchun username va password bir xil
router.post('/login', validate, adminController.LOGIN);
router.get('/admin/posts', checkToken, adminController.GET);
router.put('/admin/posts', checkToken, adminController.PUT);

export default router;

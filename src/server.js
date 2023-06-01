import express from 'express';
import fileUpload from 'express-fileupload';
import postRouter from './routers/posts.router.js';
import adminRouter from './routers/admin.router.js';
import swaggerRouter from './swagger.js';
import { resolve } from 'path';
import { PORT } from './config.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';

let app = express();

app.use(cors());
app.use(express.static(resolve('uploads')));
app.use(express.json());
app.use(fileUpload());

app.use('/api-docs', swaggerRouter);
app.use(postRouter);
app.use(adminRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log('your running at 4000'));

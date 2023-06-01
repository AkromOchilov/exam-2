import SwaggerUi from 'swagger-ui-express';
import swaggerJsDocs from 'swagger-jsdoc';
import { PORT } from './config.js';
import { Router } from 'express';

let router = Router();
let swaggerDoc = swaggerJsDocs({
	swaggerDefinition: {
		openapi: '3.0.0',
		servers: [
			{
				url: `http://localhost:${PORT}`,
				description: 'post app api',
			},
		],
		components: {
			securitySchemes: {
				Bearer: {
					type: 'apiKey',
					name: 'token',
					in: 'header',
				},
			},
		},
		info: {
			title: 'swagger for our server',
			version: '1.0.0',
			description: 'Our post app',
		},
	},
	apis: [
		`${process.cwd()}/src/swagger/components/*.yaml`,
		`${process.cwd()}/src/swagger/docs/*.yaml`,
	],
});

router.use('/', SwaggerUi.serve, SwaggerUi.setup(swaggerDoc));

export default router;

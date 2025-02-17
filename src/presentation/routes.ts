import { Router } from 'express';

// export class AppRoutes {
// 	static get routes(): Router {
// 		const router = Router();

// 		router.use('/api/user', UserRoutes.routes);

// 		return router;
// 	}
// }

export const router = Router();

router.get('/', (req, res) => {
	res.status(200).json({ ok: true });
});

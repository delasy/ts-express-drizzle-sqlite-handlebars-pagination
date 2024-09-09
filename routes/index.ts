import { Router } from 'express';
import apiCursorController from '../controllers/api-cursor';
import apiOffsetController from '../controllers/api-offset';
import cursorController from '../controllers/cursor';
import homeController from '../controllers/home';
import notFoundController from '../controllers/not-found';
import offsetController from '../controllers/offset';

const router = Router();

router.get('/', homeController);
router.get('/api/cursor', apiCursorController);
router.get('/api/offset', apiOffsetController);
router.get('/cursor', cursorController);
router.get('/offset', offsetController);
router.all('*', notFoundController);

export default router;

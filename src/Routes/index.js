import express from 'express';
import getHome from '../Controller/index.js';
import routes from './User.Routes.js'
const router = express.Router();

router.get('/', getHome)
router.use('/hallBooking', routes);

export default router;
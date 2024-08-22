import UserController from "../Controller/User.Controller.js";
import express from 'express';
let router = express.Router();

router.post('/createRoom', UserController.createRoom);
router.post('/roomBooking', UserController.roomBooking);
router.get('/roomDetails', UserController.roomDetails);
router.get('/customerDetails', UserController.customerDetails);
router.get('/customerHistory/:customerName', UserController.customerHistory);

export default router;
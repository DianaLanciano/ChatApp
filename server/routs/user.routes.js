import express from 'express';
import { getUsersForSideBar } from '../controllers/user.controllers.js';
import verifyUserLoggedIn from '../utils/verifyUserLoggedIn.js';


const router = express.Router();

router.get("/", verifyUserLoggedIn, getUsersForSideBar);

export default router;
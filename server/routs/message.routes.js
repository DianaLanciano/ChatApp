import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controllers.js';
import verifyUserLoggedIn from '../utils/verifyUserLoggedIn.js';


const router = express.Router();

router.get("/:id", verifyUserLoggedIn, getMessages); // get all messages between the logged user and the user with the id that sent in params
router.post('/send/:id', verifyUserLoggedIn, sendMessage); // the id represent the user that we would like to send a message


export default router;
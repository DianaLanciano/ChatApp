import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routs/auth.routes.js';
import messageRoutes from './routs/message.routes.js';
import userRoutes from './routs/user.routes.js';
import establishMongoConnection from './db/mongoConnectionSetup.js'

const app = express();

dotenv.config();
const PORT = process.env.PORT;

/**************************************  UTILS ************************************* */
app.use(express.json()); // to parse incoming requests 
app.use(cookieParser()); // to get token for example from user


/**************************************  MIDDLEWARE ************************************* */
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);


/**************************************  CREATE SERVER ************************************* */
establishMongoConnection(); 
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


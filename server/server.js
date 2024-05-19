import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routs/auth.routes.js';
import establishMongoConnection from './db/mongoConnectionSetup.js'

const app = express();

dotenv.config();
const PORT = process.env.PORT;

/**************************************  MIDDLEWARE ************************************* */
app.use(express.json()); // to parse incoming requests 
app.use("/api/auth", authRoutes);





/**************************************  CREATE SERVER ************************************* */
establishMongoConnection(); 
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


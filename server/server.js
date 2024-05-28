import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routs/auth.routes.js';
import messageRoutes from './routs/message.routes.js';
import userRoutes from './routs/user.routes.js';
import establishMongoConnection from './db/mongoConnectionSetup.js'
import {  app, server } from './socket/socket.js';


dotenv.config();
const __dirname = path.resolve(); // gives root directory name
const PORT = process.env.PORT || 5000;

/**************************************  UTILS ************************************* */
app.use(express.json()); // to parse incoming requests 
app.use(cookieParser()); // to get token for example from user


/**************************************  MIDDLEWARE ************************************* */
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);


/**************************************  DEPLOY CONFIGURATION ************************************* */
/*used to serve static files the we have in client (such as HTML, CSS, JavaScript, images, and other assets)*/
app.use(express.static(path.join(__dirname, "/client/dist"))); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});



/**************************************  CREATE SERVER ************************************* */
establishMongoConnection(); 
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


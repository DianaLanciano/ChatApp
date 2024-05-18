import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routs/auth.routes.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello world!");
});

// middleware
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

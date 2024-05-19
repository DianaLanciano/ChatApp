import mongoose from "mongoose";

const establishMongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connection to mongoDB has established');
    } catch (error) {
        console.log('An error occurred while trying to connect mongoDB', error.message);
    }
};

export default establishMongoConnection;
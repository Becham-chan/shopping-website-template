import mongoose from "mongoose";

const DATABASE_URI= process.env.MONGODB_URI

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(DATABASE_URI);
        console.log("Connected to MongoDB")
    }
    catch (error){
        console.log("Error connecting to MongoDB : ", error)
    }
}
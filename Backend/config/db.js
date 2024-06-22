import mongoose from "mongoose";

const connectDB = async() => {
    try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected`);
    }catch(error) {
        console.log(`database doesn't connected ${error}`);
    }
    
}

export default connectDB;
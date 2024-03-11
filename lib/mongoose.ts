import mongoose from 'mongoose'

let isConnected = false;

export const connectToDb = async()=>{
    mongoose.set('strictQuery',true);

    if (!process.env.MONGODB_URL) {
      console.log('MongoDb Url not found');
    }
    if (isConnected) {
        console.log('Already connected to MongoDB');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        isConnected =true;
        console.log('Connected to DB')
    } catch (error) {
        console.log('error in connecting db',error)
    }
}
import mongoose from 'mongoose';
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI,{
      dbName: process.env.MONGODB_DB,
    });
    console.log(`MongoDB connencted: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './lib/db.js';
const app = express();
const port = process.env.PORT || 5001;

import authRoutes from './routes/auth.route.js';

app.use('/api/auth',authRoutes);


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
  connectDB();
})

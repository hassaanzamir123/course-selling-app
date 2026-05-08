import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const connectedDB = () => {
    mongoose.connect(MONGO_URI)
    .then(()=>console.log('Database connected succesfully'))
    .catch((err)=>console.log(err))
}
export default connectedDB;
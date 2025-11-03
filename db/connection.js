import mongoose from 'mongoose';

const mongoConnection=async()=>{
    try {
        const conn=await mongoose.connect('mongodb://mongo_container:27017/testdatabase');
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('Error connecting to MongoDB:', err);
    }
}
export default mongoConnection;
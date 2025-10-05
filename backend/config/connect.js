import mongoose from 'mongoose';

export async function connect() {
  try {
    const res = await mongoose.connect(process.env.MONGDB_URI);
    if (res.connection) {
      console.log('Database connected');
    }
  } catch (error) {
    console.log(error);
  }
}

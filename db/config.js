import * as mongoose from "mongoose";

const dbConnection = async () => {
  mongoose.set('strictQuery', true);
  try {
    
    await mongoose.connect(process.env.CONNECTION_MONGO);

  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar la bd')
  }



}

export default dbConnection;
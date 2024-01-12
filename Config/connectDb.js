import mongoose from "mongoose";
import Color from "colors";

const connDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.ENV_DB_URL);
    console.log(
      `connected to mongodb Database ${conn.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`Error to connect dataBase ${error}`.bgRed);
  }
};
export default connDb;

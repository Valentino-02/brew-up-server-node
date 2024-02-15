import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

const connectToDB = async () => {
  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URL);
  mongoose.connection.on("error", (error: Error) =>
    console.log("Error connecting to MongoDB", error)
  );
};

export default connectToDB;

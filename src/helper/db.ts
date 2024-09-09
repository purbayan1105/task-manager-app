import { User } from "@/models/user";
import mongoose from "mongoose";

const configDB = {
  isConnected: 0,
};

export const connectDB = async () => {
  if (configDB.isConnected) {
    return;
  }
  try {
    const { connection } = await mongoose.connect(
      process.env.Mongo_DB_URL as string,
      {
        dbName: "Managing_Works", // It works asynchronously so, we need to use await.
      }
    );
    // configDB.isConnected = true;
    // mongoose.connect returns an object. So, {connection} desctructure

    // Now saving Data to the database with mongoose.
    console.log(connection.readyState);
    console.log("db connected");
    configDB.isConnected = connection.readyState;

    // const user = new User({
    //   name: "testing",
    //   email: "testing@gmail.com",
    //   password: "Testing",
    //   about: "It's for testing",
    //   profileURL: "Nil",
    // });
    // await user.save();

    console.log("User Created");
  } catch (error) {
    console.error("Error Occured", error);
  }
};

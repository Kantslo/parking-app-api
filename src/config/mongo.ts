import mongoose from "mongoose";

const connect = () => {
  try {
    // const url = process.env.MONGO_URL!;
    const url = "mongodb+srv://parking-app:parking-app-back-13@parking-app-api.fhboykj.mongodb.net/parking";
    mongoose.connect(url)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default connect;
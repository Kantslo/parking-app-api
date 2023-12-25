import mongoose from "mongoose";

const connect = () => {
  try {
    // const url = process.env.MONGO_URL!;
    const url = "mongodb+srv://gqancliani:urmSwXVXCe8HAZ4r@parking-app.h2jgyvm.mongodb.net/parking";
    mongoose.connect(url)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default connect;
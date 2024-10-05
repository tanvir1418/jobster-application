require("dotenv").config();

const mockData = require("./mock-data.json");
const Job = require("./models/Job");
const connectDB = require("./db/connect");

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.create(mockData);

    // Assign all jobs to demo user
    // await Job.updateMany(
    //   {},
    //   { $set: { createdBy: "6700f34137c078ae8bfa5e39" } }
    // );

    console.log("Success !!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

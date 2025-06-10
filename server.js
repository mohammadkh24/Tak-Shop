const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

const isProductionMode = process.env.NODE_ENV == "production";
if (!isProductionMode) {
  dotenv.config();
}

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected : ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error DB Connection:", error);
    process.exit(1);
  }
}

async function startSever() {
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`Server listening in ${[isProductionMode ? "production" : "development"]} on port ${port}...`);
  });
}

async function run() {
    await connectToDB()
    await startSever()
}

run()
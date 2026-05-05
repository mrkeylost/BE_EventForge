import express from "express";
import router from "./routes/api";
import connectDB from "./repository/db";
import { env } from "./utils/env";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

async function init() {
  try {
    const res = await connectDB();
    console.log(res);

    app.listen(env.PORT, () => console.log("listening port"));
  } catch (error) {
    console.log(error);
  }
}

init();

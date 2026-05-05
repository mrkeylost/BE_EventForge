import express from "express";
import cors from "cors";
import router from "./routes/api";
import connectDB from "./repository/db";
import { env } from "./utils/env";
import docs from "./docs/route";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running", data: null });
});

app.use("/api", router);
docs(app);

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

import express from "express";
import router from "./routes/api";

const PORT = 5001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => console.log("listening port"));

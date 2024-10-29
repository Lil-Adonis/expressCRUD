import express from "express";
import dotenv from "dotenv";
// import colors from 'colors';
import cookieParser from "cookie-parser";
// import cors from "cors";
import { connectDb } from "./Db/connectDb.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api", testRoutes);



const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
    connectDb();
    console.log("Server is now runnning on port", PORT);
  });





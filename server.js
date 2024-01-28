import express from "express";
import Color from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connDb from "./Config/connectDb.js";
import authRoute from "./Routes/authRoutes.js";
import categoryRoutes from "./Routes/CategoryRoute.js";
import productRoutes from "./Routes/ProductsRoutes.js";
import multer from "multer";
import path, { dirname } from "path";

import cors from "cors";
import { fileURLToPath } from "url";

// dit env call
dotenv.config();
// database config
connDb();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __dir = path.resolve();
console.log("__dir", __dir);
// Express call
const app = express();
// middleWere Morgan

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

if (process.env.ENV_MODE !== "development") {
  app.use("/", express.static(path.join(__dir, "client", "dist")));

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dir, "client", "dist", "index.html"));
  });
}

// All routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api

// app.use("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/dist/index.html"));
// });

// app get
app.get("/", (req, res) => {
  res.send("<h1>This is Ecommerece app</h1>");
});

// app PORT
const PORT = process.env.ENV_PORT || 8081;

// call port
app.listen(PORT, () => {
  console.log(
    `Hello we are listening you on ${process.env.ENV_PORT} port and have ${process.env.ENV_MODE} mode.`
      .bgBlue.white
  );
});

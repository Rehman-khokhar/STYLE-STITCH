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
// // for image
// const upload = multer({ dest: "products/" });
// app.post("upload-image", upload.single(photo), async (req, res) => {
//   console.log(req.body);
//   res.send("uploaded!!");
// });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express call
const app = express();
// middleWere Morgan

app.use(cors());

// const upload = multer({ dest: "uploads/" });
// app.post("/create-product", upload.single("photo"), (req, res) => {
//   const uploadedFile = req.file;
//   console.log("uploadedFile", uploadedFile);
//   // Process the file as needed
//   // ...
//   res.send("File uploaded successfully");
// });

app.use(express.json());
app.use(morgan("dev"));
// console.log(__dirname);
// app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(express.static(path.join(__dirname, "./client/dist")));

// All routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

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

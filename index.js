import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { router } from "./routes/auth.js";
import dbConnection from "./db/config.js";


dotenv.config();

//Crear servidor
const app = express();

//Base de datos
dbConnection();

//public
app.use(express.static("public"));

/* cors */
app.use(cors());

/* Lectura y parse del body */
app.use(express.json());

app.use("/api/auth-server/", router);

app.listen(process.env.PORT, () => {
  console.log(`Servidor activo port: ${process.env.PORT}`);
});

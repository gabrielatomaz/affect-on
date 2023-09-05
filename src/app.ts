import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import { UserRoutes } from './routes/routes'

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.listen(port);
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(UserRoutes);

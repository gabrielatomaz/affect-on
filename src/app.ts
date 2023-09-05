import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import Routes from './routes/routes'

dotenv.config();

const app: Express = express();
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

new Routes(app);

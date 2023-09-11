import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import Routes from './routes/routes'

const app: Express = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.listen(process.env.PORT || port);
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
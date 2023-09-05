import express from 'express';
import cors from 'cors';
import { UserRoutes } from './routes/routes'

const app = express();
const port = 3000;

app.use(cors());
app.use(UserRoutes);
app.listen(port);

import express from 'express';
import cors from 'cors';
import routes from './routes';
//import databaseConnection from './configs/database-connection';

const app = express();
const port = 3000;

app.use(cors());
app.use(routes)
app.listen(port);

// databaseConnection.connectToDatabase();


import express  from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors'
import { fileURLToPath } from "url";
import authRouters from './src/routes/auth_routers.js'
import loanRouters from './src/routes/loan_routers.js'
import dotenv from 'dotenv';
const app = express();
const port = process.env.PORT | 3009;

// Config the project
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// My Routers
app.use('/auth', authRouters);
app.use('/loans', loanRouters);


// Connect to the mango database and start the server
mongoose.connect('mongodb://localhost:27017/loan').then(() => {
    app.listen(port, () => {
        console.log(`Listening to port ${port}`)
    })
}).catch(err => {
    console.log("There was an error")
    console.log(err)
});
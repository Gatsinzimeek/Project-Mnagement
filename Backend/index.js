import express from "express";
import dotenv from 'dotenv';
import { graphqlHTTP } from "express-graphql";
import schema from "./Schema/schema.js";
import connectDB from "./config/db.js";
import cors from 'cors'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// Database Connection
connectDB();

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
     graphiql: process.env.NODE_ENV ==='development', 
}))

app.listen(port, console.log(`Application is running on port ${port}`));
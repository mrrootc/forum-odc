import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()
const app = express()
app.use(express.json())


const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI,{

}).then(result => console.log("database connected"))
.catch((error) => console.log(error.message))


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


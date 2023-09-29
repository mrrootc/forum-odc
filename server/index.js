import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import subjectRoutes from './routes/subject.js';
import messageRoutes from './routes/message.js';
import authRoutes from './routes/user.js';
import cors from "cors"
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:5173',
// }))

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI,{

}).then(result => console.log("database connected"))
.catch((error) => console.log(error.message))

app.use('/auth', authRoutes)
app.use('/subject', subjectRoutes)
app.use('/message', messageRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


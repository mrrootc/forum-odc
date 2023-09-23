import express from "express";
import dotenv from "dotenv";

dotenv.config()
const app = express()
app.use(express.json())


const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send("Hello Word")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


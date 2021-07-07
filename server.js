import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// Locals
import Exercise from './api/exercise.route.js'

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({defaultSucessStatus: 200}))
app.use(express.static("./public/"))

app.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + '/views/index.html')
})
app.use("/api", Exercise)
app.use("*", (req, res, next) => {
    res.status(400).json({ error: "Not Found" })
})

export default app

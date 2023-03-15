const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require("./config/db")

//connect to db
connectDB()

const app = express()

app.use(express.json()) //middle man that allows raw json
app.use(cors())


const posts = require('./routes/posts')

//mount routers
app.use('/api/posts', posts)



app.listen(8080, () => console.log("listening on port 8080"))
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require("./config/db")

//connect to db
connectDB()

const app = express()

app.use(express.json()) //middle man that allows raw json
app.use(express.urlencoded({ extended: false })) //middleman that allows urlencoded

app.use(cors())


const posts = require('./routes/posts')
const users = require('./routes/users')

//mount routers
app.use('/api/posts', posts)
app.use('/api/users', users)



app.listen(8080, () => console.log("listening on port 8080"))
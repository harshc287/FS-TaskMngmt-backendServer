const express = require('express');
require('dotenv').config();
const cors = require('cors')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require("./routes/userRoute")
const {testConnection, syncDB} = require('./config/db')
testConnection();

syncDB()

const app = express();
const port = process.env.PORT || 7000

app.use(cors());
app.use(express.json());

app.use(express.json());
app.use("/api/users", userRoutes)

app.get("/", (req, res) =>res.send("Task Manager API is working!"));
app.use('/api/tasks', taskRoutes );





app.listen(port, ()=> console.log(`✅ Server is running on port ${port}`))
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const taskRoutes = require('./routes/taskRoutes')
const {testConnection} = require('./config/db')
testConnection();

const app = express();
const port = process.env.PORT || 7000

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>res.send("Task Manager API is working!"));
app.use('/', taskRoutes );





app.listen(port, ()=> console.log(`Example of app Listining on port ${port}!`))
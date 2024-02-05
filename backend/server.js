const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv');
const tasksRoute = require("./routes/tasks")
const authRoute = require("./routes/auth")

dotenv.config();
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
const app = express();

app.options('*', cors());
app.use(express.json());

app.use("/api/tasks", tasksRoute);
app.use("/api/auth", authRoute);

db.on("error", (err) => console.log(err));
db.on("open", () => console.log("Database Connected..."));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

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

const corsOptions = {
    origin: "*",
    allowedHeaders: ['Content-type','Authorization','Origin','Access-Control-Allow-Origin','Accept','Options','X-Requested-With'],
    methods: [ "HEAD", "PUT", "PATCH", "POST", "GET", "DELETE", "OPTIONS" ],
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/tasks", tasksRoute);
app.use("/api/auth", authRoute);

app.use("/", (req,res) => {
    res.json({message: "Hello World!!"});
});

db.on("error", (err) => console.log(err));
db.on("open", () => console.log("Database Connected..."));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

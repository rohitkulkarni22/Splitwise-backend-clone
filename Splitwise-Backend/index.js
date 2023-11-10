const express = require("express");
const { connectToMongoDB } = require('./connection');
const env = require("dotenv/config");
const userRouter = require("./routes/user");
const profileRoute = require("./routes/profile");
const groupRoute = require("./routes/Group");

const app = express();
const PORT = 5005;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


// Middleware to use Json
app.use(express.json());


// Routes
app.get("/", (req, res) => {
    return res.send("Welcome to the Splitwise Clone!!!");
});

app.use('/api/users', userRouter);
app.use('/api/profile', profileRoute);
app.use('/api/group', groupRoute);

// Connect to MongoDB database
connectToMongoDB(process.env.DB_CONNECTION).then(() => 
    console.log("MongoDB connected")
);

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const playerRoutes = require("./routes/playerRoutes");

const app = express();
connectDB();
app.use(express.json());
app.use("/api", playerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
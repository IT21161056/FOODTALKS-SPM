require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");


const CardRoutes = require("./routes/CardRoutes")//viraj 
const OrderRoute = require("./routes/OrderRoute") //pasindu
const PORT = process.env.PORT || 8072;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);
app.use(errorHandler);

app.use(
  session({
    secret: "anoj123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 * 2 },
    rolling: true,
  })
);
app.use(cors(corsOptions));

app.use(express.json()); //this is a buit in middleware
app.use("/cart",CardRoutes);//viraj route


mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.once("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const usersRouter = require("./routes/users");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(logger);

app.use("/api/users", usersRouter);

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
});

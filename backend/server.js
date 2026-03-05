const express = require("express");
const usersRouter = require("./routes/users");

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

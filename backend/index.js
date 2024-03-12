const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mainRouter = require("./routes/index");

const Port = 3000;

app.use("/api/v1", mainRouter);

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword

// /api/v1/account/transferMoney
// /api/v1/account/balance

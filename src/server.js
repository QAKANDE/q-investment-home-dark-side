const express = require("express");
const mongoose = require("mongoose");
const users = require("./users/index");
const account = require("./account/index");
const cors = require("cors");
// var token = require("crypto").randomBytes(48).toString("hex");
// console.log(token);
const listEndpoints = require("express-list-endpoints");

const server = express();

const port = process.env.PORT || 3003;
server.use(cors());
server.use(express.json());
server.use("/users", users);
server.use("/account", account);
console.log(listEndpoints(server));
mongoose.connect("mongodb+srv://quadri:quadriakande@cluster0.hnvno.mongodb.net/investment-homes?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
 

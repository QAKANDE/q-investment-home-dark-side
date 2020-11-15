const express = require("express");
const router = express.Router();
const accountModel = require("../account/schema");

router.get("/", async (req, res, next) => {
  try {
    const user = await accountModel.find();
    if (user) {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await accountModel.findById(req.params.userId);
    if (user) {
      res.send(user);
    }
    else {
      res.send("User Not Found")
    }
  } catch (error) {
    console.log(error)
  }
});


router.post("/:userId", async (req, res, next) => {
  try {   
    const user = await accountModel.findById(req.params.userId)
    if (user) {    
      const userBalance = await accountModel.findByIdAndUpdate(req.params.userId , { balance : user.balance + req.body.balance}) 
      res.send("Balance Updated")
    }
    else {
      const newUser = new accountModel({ ...req.body, _id: req.params.userId });
      const savedUser = await newUser.save();
      res.send(newUser)
    }
  } catch (error) {
    console.log(error)
  }
})



module.exports = router;

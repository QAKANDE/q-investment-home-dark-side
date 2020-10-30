const express = require("express");
const router = express.Router();
const accountModel = require("../account/schema");

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await accountModel.findById(req.params.userId);
    if (user) {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const newBalance = new accountModel({
      ...req.body,
      _id: req.params.userId,
    });
    const response = await newBalance.save();
    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;

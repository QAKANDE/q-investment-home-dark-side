const express = require("express");
const router = express.Router();
const profileModel = require("../users/schema");
const { authenticate, refreshToken, generateToken } = require("./authTools");
const { authorize } = require("../../services/middlewares/authorize");
const { application, json } = require("express");

router.get("/", async (req, res, next) => {
  try {
    const users = await profileModel.find();
    res.status(201).send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/signUp/:userId",  async (req, res, next) => {
  try {
    const user = await profileModel.findById(req.params.userId);
    if (user) {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:email", authorize , async (req, res, next) => {
try {
  const user = await profileModel.find()
  const filteredUser = user.filter((user => user.email === req.params.email))
res.send(filteredUser)
  
} catch (error) {
  console.log(error)
}
})

router.get("/:userId", authorize,  async (req, res, next) => {
  try {
    const user = await profileModel.findById(req.params.userId);
    if (user) {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});
router.post("/register", async (req, res, next) => {
  try {
    const newUser = new profileModel(req.body);
    const { _id } = await newUser.save();
    console.log(newUser._id);
    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await profileModel.findByCredentials(email, password);
  
    const tokens = await generateToken(user);

    if (user) {
     
      res.send(tokens);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/mee", authorize, async (req, res, next) => {
  try {
    let user = await profileModel.find();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});
router.get("/me", authorize, async (req, res, next) => {
  try {
   console.log("here")
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProfile = new profileModel(req.body);
    const response = await newProfile.save();
    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", authorize, async (req, res, next) => {
  try {
    const editprofile = await profileModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    const edited = await profileModel.findById(req.params.id);
    res.send(edited);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", authorize, async (req, res, next) => {
  try {
    const deleted = await profileModel.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

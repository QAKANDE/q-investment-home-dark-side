const jwt = require("jsonwebtoken");
const profileModel = require ("../../src/users/schema")
const { verifyJWT } = require("../../src/users/authTools");

const authorize = async (req, res, next) => {
  try {
    // const token = req.cookies.token;
     const token = req.headers.authorization.replace("Bearer ", "");

    if (token) {
      const credentials = await verifyJWT(token);

      const user = await profileModel.findById(credentials._id);

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send('Check your username/passord');
      }
    }
   
  
    // // const token = req.cookies.accessToken
    // const decoded = await verifyJWT(token);
    // console.log(decoded);
    // const user = await profileModel.findOne({
    //   _id: decoded._id,
    // });
    // console.log(user);
    // if (!user) {
    //   throw new Error();
    // }
    // req.token = token;
    // req.user = user;
    // next();
  } catch (e) {
    console.log(e);
    const err = new Error("Please authenticate");
    err.httpStatusCode = 401;
    next(err);
  }
};

const adminOnlyMiddleware = async (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else {
    const err = new Error("Only for admins!");
    err.httpStatusCode = 403;
    next(err);
  }
};

module.exports = { authorize, adminOnlyMiddleware };

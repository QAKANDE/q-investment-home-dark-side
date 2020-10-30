const jwt = require("jsonwebtoken");

const authenticate = async (user) => {
  try {
    // generate tokens
    const newAccessToken = await generateJWT({ _id: user._id });
    return newAccessToken;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const generateJWT = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      //{ expiresIn: "15m" },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    )
  );

const verifyJWT = (token) =>
  new Promise((res, rej) => {
    // console.log('*****************************************************************')
    // console.log(token)
    // console.log(process.env.SECRET_KEY)
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    });
  });

module.exports = { authenticate, verifyJWT };

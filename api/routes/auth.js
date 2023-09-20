const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(401).json("missing credantials!");
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json("wrong credantials!");

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    if (originalPassword !== password)
      return res.status(401).json("wrong credantials!");

    // create acesss token
    const acessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "50d" }
    );

    // send user info except password
    const { password: docPassword, ...others } = user._doc;

    res.status(200).json({ ...others, acessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

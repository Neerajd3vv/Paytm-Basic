const express = require("express");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require("zod");
const authMiddleware = require("../middlewares");
const { Account } = require("../db");

// signup zod schema
const singupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

// signin zod schema
const singinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

// update zod schema
const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().min(6).optional(),
});

// routes
router.post("/signup", async (req, res) => {
  const { success } = singupSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(411)
      .json({ msg: "Email already taken / Incorrect inputs" });
  } else {
    const userExists = await User.findOne({
      username: req.body.username,
    });

    if (!userExists) {
      const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      });
      const userId = user._id;

      // Creates a dummy balance for user to play with //
      await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
      });
      const token = jwt.sign({ userId }, JWT_SECRET);
      res.status(200).json({ msg: "User created successfully", token: token });

      ////                               ////
    } else {
      return res
        .status(411)
        .json({ msg: "Email already taken/Incorrect inputs" });
    }
  }
});

router.post("/signin", async (req, res) => {
  const { success } = singinSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ msg: "Incorrect inputs" });
  } else {
    const userExists = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!userExists) {
      return res.status(401).json({ msg: "Error while logging in" });
    } else {
      const token = jwt.sign({ userId: userExists._id }, JWT_SECRET);
      res.status(200).json({ token: token });
    }
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  
  const filter = req.query.filter || "";
  const matchedUser = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: matchedUser.map((eachUser) => ({
      username: eachUser.username,
      firstName: eachUser.firstName,
      lastName: eachUser.lastName,
      _id: eachUser._id,
    })),
  });
});

router.post("/verify" , (req,res)=>{
  const fullToken = req.headers.authorization
  if (!fullToken ||!fullToken.startsWith("Bearer ") ) {
    return res.status(403).json({});
  }
  const actualToken = fullToken.split(" ")[1]
  try {
    const decoded = jwt.verify(actualToken , JWT_SECRET)
    res.json({user: decoded.userId})
  } catch (error) {
    res.json({msg:"Something wrong with token"})
  }
})

module.exports = router;

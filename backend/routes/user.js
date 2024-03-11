const express = require("express");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require("zod");
const authMiddleware = require("../middlewares");
const { Account  } = require("../db");

// signup zod schema
const singupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string().max(30),
  lastName: zod.string().max(30),
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
  const { response } = singupSchema.safeParse(req.body);

  if (!response) {
    return res
      .status(411)
      .json({ msg: "Email already taken / Incorrect inputs" });
  } else {
    const userExists = await User.findOne({
      username,
    });

    if (!userExists) {
      const user = await User.create({
        username,
        firstName,
        lastName,
        password,
      });
      const userId = user._id;
      const token = jwt.sign(userId, JWT_SECRET);
      res.status(200).json({ msg: "User created successfully", token: token });

      // Creates a dummy balance for user to play with //
      await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
      });

      ////                               ////
    } else {
      return res
        .status(411)
        .json({ msg: "Email already taken/Incorrect inputs" });
    }
  }
});

router.post("/signin", async (req, res) => {
  const { responsetwo } = singinSchema.safeParse(req.body);
  if (!responsetwo) {
    res.status(411).json({ msg: "Incorrect inputs" });
  } else {
    const userExists = await User.findOne({
      username,
      password,
    });
    if (!userExists) {
      return res.status(411).json({ msg: "Error while logging in" });
    } else {
      const token = jwt.sign({ userId: userExists._id }, JWT_SECRET);
      res.status(200).json({ token: token });
    }
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { response } = updateSchema.safeParse(req.body);
  if (!response) {
    res.status(411).json({ msg: "Error while updating information" });
  }
  await User.updateOne({ _id: req.userId }, req.body);
  res.status(200).json({ msg: "Updated successfully" });
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

module.exports = router;

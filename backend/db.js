const mongoose = require("mongoose");

// connect to mongoDb
mongoose.connect(
  ""
);

// mongoose user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 30,
    lowerCase: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
  },
  password: {
    type: String,
    minLength: 5,
    required: true,
  },
});

// mongoose bankBalance schema
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

// model
const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account ", accountSchema);

//export
module.exports = {
  User,
  Account,
};

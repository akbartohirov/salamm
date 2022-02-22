const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
    },
    phone: { type: Number, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAdminAddProduct: {
      type: Boolean,
      default: false,
    },
    isAdminOrderViewer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  return userObject;
};

UserSchema.methods.generateToken = async function () {
  const user = this;

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.SECRET,
    {
      expiresIn: 12 * 30 * 24 * 60 * 60 * 1000,
    }
  );

  return token;
};

UserSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

const { Schema, model } = require("mongoose");
const Joi = require("joi");



const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  avatarURL: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  }
}, {versionKey: false, timestamps: true});

userSchema.post("save", (error, data, next) => {
  const {name, code} = error;
  error.status = (name === "MongoServerError" && code === 11000 ? 409 : 400)
  next();
});

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
})

const User = model('user', userSchema);

module.exports = {
  registerSchema,
  User
}
const mongoose = require("mongoose");
const validator = require("validator");

// Defining Schema
const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
    phone: {
      type: Number,
      min: 10,
      required: true,
      unique: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
});

// Defining Collection
const Student = new mongoose.model("Student", studentsSchema);

module.exports = Student;

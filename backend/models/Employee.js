const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,

    },
    designation: {
      type: String,
      required: true,
      enum: ['HR', 'Manager', 'Sales','Accountant'],

    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],

    },
    course: {
      type: [String],
      required: true,
      
    },
    img: {
        type: [String],
    },

  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
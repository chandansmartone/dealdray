const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: Number, unique: true },

    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    mobileNo: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Gender is required'],
    },
    course: {
      type: [String],
    },
    image: {
      type: String, // You might want to store the file path or URL here
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

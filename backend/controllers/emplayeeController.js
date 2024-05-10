const multer = require('multer');
const Employee = require('../models/Employee');
const cloudinary = require("cloudinary");
const _ = require('lodash');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  generateProductId = async () => {
    let empid;
    let isTrue = true;

    while (isTrue) {
        const id = _.random(1000000, 9999999);
        const existingEmployee = await Employee.findOne({ employeeId: id });
        if (!existingEmployee) {
            empid = id;
            isTrue = false;
        }
    }
    return empid;
};
exports.createEmployee = async (req, res) => {
    try {
        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email: req.body.email });
        console.log(existingEmployee);
        if (existingEmployee) {
          return res.status(400).json({ success: false, error: 'Email already exists',message:"Email already exists" });
        }
        // image = req.body.image;
        // if (image) {
        //   const result = await cloudinary.v2.uploader.upload(image, {
        //     folder: "PerfectFit/products",
        //   });

        //   // Set the image URL in the request body
        //   req.body.image = result.secure_url;
        //   console.log(result.secure_url);
        // }

        // Create the employee with the image URL
        req.body.employeeId = await generateProductId();

        const employee = await Employee.create({
          ...req.body,
          image: req.body.image,
        });

        // Send the response
        res.status(201).json({ success: true, data: employee });
      } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, error: error.message });
     
    }

}
exports.getAllEmployees = async (req, res) => {
    try {
        // Retrieve all employees from the database
        const employees = await Employee.find();

        // Return the list of employees as a JSON response
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


exports.getEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findOne({ employeeId }); // Corrected variable name to 'employee'
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message }); // Return error message
  }
};

exports.updateEmployee = async (req, res) => {
  try {
      const { employeeId } = req.params;
      const updatedEmployee = await Employee.findOneAndUpdate(
          { employeeId },
          req.body, 
          { new: true } 
      );

      if (!updatedEmployee) {
          return res.status(404).json({ success: false, error: 'Employee not found' });
      }

      res.status(200).json({ success: true, data: updatedEmployee });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(_id);
    if (!deletedEmployee) {
      return res.status(404).json({ success: false, error: 'Employee not found.' });
    }
    res.status(200).json({ success: true, message: "Employee deleted successfully." });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ success: false, error: "Failed to delete employee. Please try again." });
  }
};
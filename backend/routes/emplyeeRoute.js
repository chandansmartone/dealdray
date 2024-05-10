// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const { 
    createEmployee,
    getAllEmployees,
    updateEmployee,
    getEmployee,
    deleteEmployee
} = require('../controllers/emplayeeController');

router.post('/employee', createEmployee);
router.get('/employees',getAllEmployees );
router.get('/employee/:employeeId',getEmployee);
router.put('/employee/:employeeId',updateEmployee);
router.delete('/employee/:_id', deleteEmployee);

module.exports = router;

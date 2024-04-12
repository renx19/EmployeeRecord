const express = require('express');
const router = express.Router();
const EmployeeRecord = require('../models/Employee');
const bcrypt = require('bcrypt');

// @route GET api/employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await EmployeeRecord.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @route POST api/employees
router.post('/employees', async (req, res) => {
    const employeeFields = req.body;

    try {
        const newEmployee = new EmployeeRecord(employeeFields);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @route PUT api/employees/:id
router.put('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const employeeFields = req.body;

    try {
        const updatedEmployee = await EmployeeRecord.findByIdAndUpdate(id, employeeFields, { new: true });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @route DELETE api/employees/:id
router.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await EmployeeRecord.findByIdAndDelete(id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = router;

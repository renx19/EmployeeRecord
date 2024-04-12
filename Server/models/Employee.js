const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    // Common fields
    name: String,       // Employee name
    phone: String,      // Phone number
    address: String,    // Address
    email: String,      // Email address

    // Additional dynamic fields
    gender: String,     // Gender
    age: Number,        // Age
    tin: String,        // TIN number
    pagibig: String,    // PAGIBIG number
    sss: String,        // SSS number
    philhealth: String, // PHILHEALTH number
    birthday: Date      // Birthday (stored as a Date object)
});

  
 EmployeeRecord = mongoose.model('EmployeesRecord', RecordSchema);


 module.exports = EmployeeRecord;

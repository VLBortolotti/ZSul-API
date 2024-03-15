const mongoose = require('mongoose')
const database = require('../infra/database')

const staffSchema = mongoose.Schema(
    { 
        teamId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        }, 
        dateOfBirth: {
            type: String, // date
            required: true 
        },
        RG: {
            type: String,
            default: null
        },
        CPF: {
            type: String,
            default: null
        },
        cargo: {
            type: String,
            required: true
        },
        fotoStaff: {
            type: String, // Buffer
            default: null
        },
        fotoStaffBase64: {
            type: String,
            default: null
        },
        permission: {
            type: String,
            default: "Staff"
        },
    }
);

module.exports = mongoose.model('Staff', staffSchema)
const Staff = require('../models/StaffModel')

exports.postStaff = async (teamId, name, dateOfBirth, documentNumber, cargo, fotoStaff, fotoStaffBase64 ) => {
    if (documentNumber.length === 10 ) {
        const staff = new Staff({ teamId, name, dateOfBirth, RG: documentNumber, CPF: null, cargo, fotoStaff, fotoStaffBase64 })
        return await staff.save()
    } else if (documentNumber.length === 11) {
        const staff = new Staff({ teamId, name, dateOfBirth, RG: null, CPF: documentNumber, cargo, fotoStaff, fotoStaffBase64 })
        return await staff.save()
    }
}

exports.getAllStaffs = async () => {
    return await Staff.find({ }, '-__v -password')
}

exports.getStaffById = async (id) => {
    return await Staff.findOne({ _id: id }, '-__v')
}

exports.getStaffsByTeamId = async (id) => {
    return await Staff.find({ teamId: id }, '-__v -password')
}

exports.deleteStaffById = async (id) => {
    return await Staff.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Staff.deleteMany({ })
}
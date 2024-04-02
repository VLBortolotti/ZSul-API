const User = require('../models/UserModel')

exports.postUser = async (teamName, email, password, city, state) => {
    const user = new User({ teamName, email, password, city, state })

    return await user.save()
}

exports.postUserAdmin = async (teamName, email, password, city, state) => {
    const user = new User({ 
        teamName: teamName, 
        email: email, 
        password: password, 
        city: city, 
        state: state,
        permission: "admin" 
    })

    console.log(`user: ${user}`)

    return await user.save()
}

exports.getAllUsers = async () => {
    return User.find({}, '-__v -password')
}

exports.getUserByTeamName = async (teamName) => {
    return User.findOne({ teamName: teamName }, '-__v -password')
}

exports.getUserByEmail = async (email) => {
    return User.findOne({ email: email }, '-__v -password')
}

exports.getUserByEmailToRecoverPwd = async (email) => {
    return User.findOne({ email: email }, '-__v')
}

exports._getUserByEmail = async (email) => {
    return User.findOne({ email: email }, '-__v')
}

exports.getUserById = async (id) => {
    return User.findOne({ _id: id }, '-__v -password')
}

exports.deleteUserById = async (id) => {
    return User.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return User.deleteMany({ })
}
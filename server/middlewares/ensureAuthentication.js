const secret   = process.env.SECRET
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken')
const usersData = require('../data/usersData')

exports.ensureAuthorization = async (req, res, next) => {
    try {
        const token = req.header('token')

        console.log(`token AA: ${token}`)

        if (!token) {
            res.status(404).json({
                status: 404,
                msg:    'Error',
                data:   'Token inválido.'
            })
        } 

        const decoded = jwt.verify(token, secret)
        const user    = await usersData.getUserById(decoded.id)

        if (!user) {
            res.status(404).json({
                status: 404,
                msg:    'Error',
                data:   'Usuário não encontrado'
            })
        }

        req.teamId = decoded.id
        next()

    } catch (error) {
        console.log(`Erro: ${error}`)
        return res.status(500).json({
            status: 500,
            msg: 'Error',
            data: 'Erro no servidor'
        })
    }
}
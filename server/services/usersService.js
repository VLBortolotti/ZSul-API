const secret          = process.env.SECRET
const bcrypt          = require('bcrypt')
const jwt             = require('jsonwebtoken')
const { ResponseDTO } = require('../dtos/Response')
const usersData       = require('../data/usersData')

const UserModel = require('../models/UserModel')

exports.postUser = async (teamName, email, password, confirmPassword, city, state) => {
    try {
        if (!teamName) {
            return new ResponseDTO('Error', 400, 'Nome não preenchido')
        }

        if (teamName.length <= 4) {
            return new ResponseDTO('Error', 400, 'Nome curto')
        }

        if (await usersData.getUserByTeamName(teamName)) {
            return new ResponseDTO('Error', 400, 'Nome já está sendo utilizado')
        }

        if (!email) {
            return new ResponseDTO('Error', 400, 'Email não preenchido')
        }

        if (email.length <= 4) {
            return new ResponseDTO('Error', 400, 'Email curto')
        }

        if (await usersData.getUserByEmail(email)) {
            return new ResponseDTO('Error', 400, 'Email já está sendo utilizado')
        }

        if (!city) {
            return new ResponseDTO('Error', 400, 'Cidade não preenchida')
        }

        if (!state) {
            return new ResponseDTO('Error', 400, 'Estado não preenchido')
        }

        if (!password) {
            return new ResponseDTO('Error', 400, 'Senha não preenchida')
        }

        if (password.length <= 4) {
            return new ResponseDTO('Error', 400, 'Senha curta')
        }

        if (password !== confirmPassword) {
            return new ResponseDTO('Error', 400, 'As senhas não são iguais')
        }

        const salt      = await bcrypt.genSalt(12)
        const hashedPwd = await bcrypt.hash(password, salt)
        await usersData.postUser(teamName, email, hashedPwd, city, state)

        const newUser = await usersData.getUserByTeamName(teamName)

        return new ResponseDTO('Success', 200, 'ok', newUser)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.postUserAdmin = async (userId, teamName, email, password, confirmPassword, city, state) => {
    try {
        console.log(`aqui`)
        console.log(`password: ${password}\nconfirmPassword: ${confirmPassword}`)
        if (!userId) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(userId)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        const user = await usersData.getUserById(userId) 
        if (!user) {
            return new ResponseDTO('Error', 400, 'Usuário que está fazendo esta requisição possui um identificador não existente')
        }

        if (!teamName) {
            return new ResponseDTO('Error', 400, 'Nome não preenchido')
        }

        if (teamName.length <= 4) {
            return new ResponseDTO('Error', 400, 'Nome curto')
        }

        if (await usersData.getUserByTeamName(teamName)) {
            return new ResponseDTO('Error', 400, 'Nome já está sendo utilizado')
        }

        if (!email) {
            return new ResponseDTO('Error', 400, 'Email não preenchido')
        }

        if (email.length <= 4) {
            return new ResponseDTO('Error', 400, 'Email curto')
        }

        if (await usersData.getUserByEmail(email)) {
            return new ResponseDTO('Error', 400, 'Email já está sendo utilizado')
        }

        if (!city) {
            return new ResponseDTO('Error', 400, 'Cidade não preenchida')
        }

        if (!state) {
            return new ResponseDTO('Error', 400, 'Estado não preenchido')
        }

        if (!password) {
            return new ResponseDTO('Error', 400, 'Senha não preenchida')
        }

        if (password.length <= 4) {
            return new ResponseDTO('Error', 400, 'Senha curta')
        }

        
        if (password !== confirmPassword) {
            return new ResponseDTO('Error', 400, 'As senhas não são iguais')
        }

        const salt      = await bcrypt.genSalt(12)
        const hashedPwd = await bcrypt.hash(password, salt)
        await usersData.postUserAdmin(teamName, email, hashedPwd, city, state)

        // const newUser  = await JogoModel.findOneAndUpdate({ teamName: teamName }, { permission: "admin" })
        // newJogo[field] = value

        // console.log(`newUser: ${newUser}`)

        // await newUser.save()

        const newUser = await usersData.getUserByTeamName(teamName)

        return new ResponseDTO('Success', 200, 'ok', newUser)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.loginUser = async (email, password) => {
    try {
        if (!email) {
            return new ResponseDTO('Error', 400, 'Email não foi preenchido')
        }

        if (!password) {
            return new ResponseDTO('Error', 400, 'Senha não foi preenchida')
        }

        const user = await usersData._getUserByEmail(email)

        if (!user) {
            return new ResponseDTO('Error', 404, 'Usuário com estas credenciais não encontrado')
        }

        const checkPwd = await bcrypt.compare(password, user.password)

        if (!checkPwd) {
            return new ResponseDTO('Error', 400, 'Credenciais erradas')
        }
        
        const token = jwt.sign({
            id: user._id
        }, secret)

        return new ResponseDTO('Success', 200, 'ok', { token: token, teamName: user.teamName, email: user.email, id: user._id })
 
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllUsers = async () => {
    try {
        const response = await usersData.getAllUsers()
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getUserById = async (id) => {
    try {
        const response = await usersData.getUserById(id)
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateUserById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo que deseja ser atualizado não preenchido.')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor do campo que deseja ser atualizado não preenchido.')
        }

        const user = await usersData.getUserById(id)

        if (!user) {
            return new ResponseDTO('Error', 404, 'Usuário não encontrado.')
        }

        user[field] = value

        await user.validate()
        await user.save()

        const response = await usersData.getUserById(id)

        return new ResponseDTO('Success', 200, 'ok', response)
    } 
    catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteUserById = async (id) => {
    try {
        const response = await usersData.deleteUserById(id)

        if (response.deletedCount == 1) {
            return new ResponseDTO('Success', 200, 'ok')
        } 
        else {
            return new ResponseDTO('Error', 404, 'Usuário não encontrado')
        }     

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await usersData.cleanDatabase()

        if (response.deletedCount !== 0) {
            return new ResponseDTO('Success', 200, 'ok', response.deletedCount)
        } 
        else {
            return new ResponseDTO('Error', 404, 'Usuário não encontrado')
        }   

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}
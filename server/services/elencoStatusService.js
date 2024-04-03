const { ResponseDTO }   = require('../dtos/Response')
const ElencoStatusModel = require('../models/ElencoStatusModel')
const elencoStatusData  = require('../data/elencoStatusData')

exports.postElencoStatus = async (status) => {
    try {
        if (!status) {
            return new ResponseDTO('Error', 400, 'O status não foi preenchido')
        }

        const elencoStatus = elencoStatusData.getElencoStatus()
        console.log(Object.keys(elencoStatus).length)
        if (elencoStatus) {
            const newElencoStatus  = await ElencoStatusModel.findOneAndUpdate({ }, { status: status })
            // newElencoStatus[status] = status

            // await newElencoStatus.save()

            // elencoStatus[status] = status
            // await elencoStatus.save()
            
            const response = await elencoStatusData.getElencoStatus()
            return new ResponseDTO('Success', 200, 'ok', response)
        } 

        const response = await elencoStatusData.postElencoStatus(status)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getElencoStatus = async () => {
    try {
        const response = await elencoStatusData.getElencoStatus()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateElencoStatus = async (status) => {
    try {
        if (!status) {
            return new ResponseDTO('Error', 400, 'O status não foi preenchido')
        }

        const elencoStatus = elencoStatusData.getElencoStatus()

        if (!elencoStatus) {
            return new ResponseDTO('Error', 404, 'Não existe um status de elenco cadastrado')
        }

        elencoStatus[status] = status
        await elencoStatus.validate()
        await elencoStatus.save()

        const response = await elencoStatusData.getElencoStatus()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteElencoStatus = async () => {
    try {
        const response = await elencoStatusData.deleteElencoStatus()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}
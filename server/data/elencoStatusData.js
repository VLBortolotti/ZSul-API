const ElencoStatus = require('../models/ElencoStatusModel')

exports.postElencoStatus = async (status) => {
    const elencoStatus = new ElencoStatus({ status })
    
    return await elencoStatus.save()
}

exports.getElencoStatus = async () => {
    return await ElencoStatus.find({ }, '-__v')
}

exports.deleteElencoStatus = async () => {
    return await ElencoStatus.deleteOne({ })
}
const multer = require("multer")
const path   = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.resolve("public/images"))
    },
    filename: function(req, file, callback) {
        const time = new Date().getTime()
        console.log(`Req: ${req}`)
        
        callback(null, `${time}_${file.originalname}`)
    }
})

const upload = multer({ storage })

module.exports = upload
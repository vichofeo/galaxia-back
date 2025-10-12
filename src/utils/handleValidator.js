const HandleErrors = require("./handleErrors")
const handleError =  new HandleErrors()

const {validationResult} =  require("express-validator")
const validateResult = (req, res, next) =>{
try {
    validationResult(req).throw()
    return next()
} catch (error) {
    handleError.setCode(403)
    handleError.setRes(res)
    handleError.setMessage(error.array())
    handleError.handleErrorResponse()
}
}

module.exports = validateResult 
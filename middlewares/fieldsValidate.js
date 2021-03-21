const { validationResult } = require("express-validator")
const { errorResponse } = require("../helpers/response")

const fieldsValidate = (req, res, next) => {
    const errors = validationResult( req )
    if( !errors.isEmpty() ) {
        errorResponse( req, res, errors, 400 )
    }
    next()
}

module.exports = {
    fieldsValidate
}
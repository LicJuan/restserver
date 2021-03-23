const { fieldsValidate } = require('./fieldsValidate')
const { tokenVerification } = require('./tokenVerification')
const { hasRoles } = require('./roleValidate')

module.exports = {
    fieldsValidate, tokenVerification, hasRoles
}
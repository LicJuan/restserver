const { check } = require('express-validator')
const { login } = require('../controllers/AuthController')
const { fieldsValidate } = require('../middlewares/fieldsValidate')

const router = require('express').Router()

router.post( '/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldsValidate
], login )

module.exports = router
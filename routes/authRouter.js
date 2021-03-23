const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/AuthController')
const { fieldsValidate } = require('../middlewares/fieldsValidate')

const router = require('express').Router()

router.post( '/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldsValidate
], login )

router.post( '/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    fieldsValidate
], googleSignIn )


module.exports = router
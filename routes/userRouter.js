const { check } = require('express-validator')
const { addUser, updateUser, getUsers, deleteUser } = require('../controllers/UserController')
const { isRoleValid, isEmailExists, isUserById } = require('../helpers/dbValidators')
const { fieldsValidate, tokenVerification, hasRoles } = require( '../middlewares' )

const router = require( 'express' ).Router()

router.get( '/', getUsers )
router.post( '/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    check('email').custom( isEmailExists ),
    check('rol').custom( isRoleValid ),
    fieldsValidate
], addUser )


router.put( '/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isUserById ),
    check('rol').custom( isRoleValid ),
    fieldsValidate
], updateUser )

router.delete( '/:id',[
    tokenVerification,
    // isAdmin,
    hasRoles( 'ADMIN_ROLE', 'SALES_ROLE' ),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isUserById ),
    fieldsValidate
], deleteUser )

module.exports = router
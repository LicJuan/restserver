const router = require( 'express' ).Router()
const { check } = require('express-validator')
const { addCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/CategoryController')
const { existsCategoryById } = require('../helpers/dbValidators')
const { fieldsValidate } = require('../middlewares/fieldsValidate')
const { isAdmin } = require('../middlewares/roleValidate')
const { tokenVerification } = require('../middlewares/tokenVerification')

router.post( '/',[
    tokenVerification,
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    fieldsValidate
], addCategory )
router.get( '/', getCategories )
router.get( '/:id', [
    check( 'id', 'No es un id valido' ).isMongoId(),
    check( 'id' ).custom( existsCategoryById ),
    fieldsValidate
], getCategory )
router.put( '/:id', [
    tokenVerification,
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'id' ).custom( existsCategoryById ),
    fieldsValidate
], updateCategory )
router.delete( '/:id',[
    tokenVerification,
    isAdmin,
    check( 'id', 'No es un id valido' ).isMongoId(),
    check( 'id' ).custom( existsCategoryById ),
    fieldsValidate
], deleteCategory )


module.exports = router
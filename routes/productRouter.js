const router = require('express').Router()
const { check } = require('express-validator')
const { existsProductById, existsCategoryById } = require('../helpers/dbValidators')
const { fieldsValidate } = require('../middlewares/fieldsValidate')
const { isAdmin } = require('../middlewares/roleValidate')
const { tokenVerification } = require('../middlewares/tokenVerification')
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/ProductController')

router.post( '/',[
    tokenVerification,
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'category', 'La categoria no es un id' ).isMongoId(),
    check( 'category' ).custom( existsCategoryById ),
    fieldsValidate
], addProduct )
router.get( '/', getProducts )
router.get( '/:id', [
    check( 'id', 'No es un id valido' ).isMongoId(),
    check( 'id' ).custom( existsProductById ),
    fieldsValidate
], getProduct )
router.put( '/:id', [
    tokenVerification,
    check( 'category', 'La categoria no es un id' ).isMongoId(),
    check( 'id' ).custom( existsProductById ),
    fieldsValidate
], updateProduct )
router.delete( '/:id',[
    tokenVerification,
    isAdmin,
    check( 'id', 'No es un id valido' ).isMongoId(),
    check( 'id' ).custom( existsProductById ),
    fieldsValidate
], deleteProduct )

module.exports = router
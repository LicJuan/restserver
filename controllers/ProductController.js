const { successResponse, errorResponse } = require("../helpers/response")
const Product = require("../models/Product")
const addProduct = async ( req, res ) => {
    const { status, user, ...body } = req.body
    try {
        const productDB = await Product.findOne({ name: body.name.toUpperCase() })
        if( productDB ) errorResponse( req, res, `El producto ${ productDB.name } ya existe en la base de datos`, 400 )
        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.user._id
        }
        await Product.create(data)
        successResponse( req, res, 'Creado correctamente' )
    } catch (err) {
        errorResponse( req, res, err, 500 )
    }
}
const getProducts = async ( req, res ) => {
    const { desde = 0, limite= 5 } = req.query
    const query = { status: true }
    const [ total, products ] = await Promise.all([
         Product.countDocuments( query ),
         Product.find( query )
            .populate( 'user', 'name' )
            .populate( 'category', 'name' )
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ])
    successResponse( req, res, { total, products } )
}
const getProduct = async ( req, res ) => {
    const { id } = req.params
    const product = await Product.findById( id )
            .populate('user', 'name')
            .populate('category', 'name')
    successResponse( req, res, product )
}
const updateProduct = async ( req, res ) => {
    const { id } = req.params
    const { status, user, ...data } = req.body
    data.name = data.name.toUpperCase()
    data.user = req.user._id

    const product = await Product.findByIdAndUpdate( id, data, {
        new: true
    })
    successResponse( req, res, product )
}
const deleteProduct = async ( req, res ) => {
    const { id } = req.params
    const productDelete = await Product.findByIdAndUpdate(id, { status: false }, { new: true })
    successResponse( req, res, productDelete )
}

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
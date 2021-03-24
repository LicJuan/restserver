const { successResponse, errorResponse } = require("../helpers/response")
const Category = require("../models/Category")

const addCategory = async ( req, res ) => {
    const name = req.body.name.toUpperCase()
    try {
        const categoryDB = await Category.findOne({ name })
        if( categoryDB ) errorResponse( req, res, `La categoria ${ categoryDB.name } ya existe en la base de datos`, 400 )
        const data = {
            name,
            user: req.user._id
        }
        await Category.create(data)
        successResponse( req, res, 'Creado correctamente' )
    } catch (err) {
        errorResponse( req, res, err, 500 )
    }
}

const getCategories = async ( req, res ) => {
    const { desde = 0, limite= 5 } = req.query
    const query = { status: true }
    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
            .populate( 'user', 'name' )
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ])
    successResponse( req, res, { total, categories } )
}

const getCategory = async ( req, res ) => {
    const { id } = req.params
    const category = await Category.findById( id ).populate('user', 'name')
    successResponse( req, res, category )
}

const updateCategory = async ( req, res ) => {
    const { id } = req.params
    const { status, user, ...data } = req.body
    data.name = data.name.toUpperCase()
    data.user = req.user._id

    const category = await Category.findByIdAndUpdate( id, data, {
        new: true
    })
    successResponse( req, res, category )
}

const deleteCategory = async ( req, res ) => {
    const { id } = req.params
    const categoryDelete = await Category.findByIdAndUpdate(id, { status: false }, { new: true })
    successResponse( req, res, categoryDelete )
}


module.exports = {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}
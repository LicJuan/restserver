const Category = require('../models/Category')
const Product = require('../models/Product')
const Role = require('../models/Role')
const User = require('../models/User')

const isRoleValid = async (rol = '') => {
    const roleExists = await Role.findOne({ rol })
    if( !roleExists ) {
        throw new Error(`El rol ${rol} no existe en la base de datos`)
    }
}

const isEmailExists = async ( email = '' ) => {
    const emailExists = await User.findOne({ email })
    if( emailExists ) {
        throw new Error( `El email ${ email } ya esta registrado` )
    }
}

const isUserById = async ( id ) => {
    const userExists = await User.findById(id)
    if( !userExists ) {
        throw new Error( `El id no existe ${ id }` )
    }
}

const existsCategoryById = async (  id ) => {
    const categoryExists = await Category.findById( id )
    if( !categoryExists ) throw new Error(`El id no existe ${id}`)
} 
const existsProductById = async (  id ) => {
    const ProductExists = await Product.findById( id )
    if( !ProductExists ) throw new Error(`El id no existe ${id}`)
} 


module.exports = {
    isRoleValid,
    isEmailExists,
    isUserById,
    existsCategoryById,
    existsProductById
}
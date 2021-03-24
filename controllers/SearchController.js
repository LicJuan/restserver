const { successResponse, errorResponse } = require("../helpers/response")
const User = require( '../models/User' )
const Category = require( '../models/Category' )
const Product = require( '../models/Product' )
const { ObjectId } = require('mongoose').Types
const collections = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUsers = async ( req, res, term ) => {
    const isMongoid = ObjectId.isValid( term )
    if( isMongoid ) {
        const user = await User.findById( term )
        successResponse( req, res, {
            results: ( user ) ? [ user ] : []
        })
    }
    const regexp = new RegExp(term, 'i') 
    const users = await User.find({
        $or: [
            {name: regexp},
            {email: regexp}
        ],
        $and: [{ status: true }]
    })
    successResponse( req, res, {
        results: users
    })
}

const searchCategories = async ( req, res, term ) => {
    const isMongoid = ObjectId.isValid( term )
    if( isMongoid ) {
        const category = await Category.findById( term )
        successResponse( req, res, {
            results: ( category ) ? [ category ] : []
        })
    }
    const regexp = new RegExp(term, 'i') 
    const categories = await Category.find({name: regexp, status: true})
    successResponse( req, res, {
        results: categories
    })
}

const searchProducts = async ( req, res, term ) => {
    const isMongoid = ObjectId.isValid( term )
    if( isMongoid ) {
        const product = await Product.findById( term )
                        .populate( 'category', 'name' )
                        .populate( 'user', 'name' )
        successResponse( req, res, {
            results: ( product ) ? [ product ] : []
        })
    }
    const regexp = new RegExp(term, 'i') 
    const products = await Product.find({name: regexp, status: true})
                        .populate( 'category', 'name' )
                        .populate( 'user', 'name' )
    successResponse( req, res, {
        results: products
    })
}

const search = ( req, res ) => {
    const { collection, term } = req.params
    if( !collections.includes( collection ) ) errorResponse( req, res, `Las colecciones permitidas son ${ collections }`, 400 )
    
    switch (collection) {
        case 'users':
            searchUsers( req, res, term )
            break;
        case 'categories':
            searchCategories( req, res, term )
            break;
        case 'products':
            searchProducts( req, res, term )
            break;
        default:
            errorResponse( req, res, 'Se me olvido', 500 );
    }
} 

module.exports = {
    search
}
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { successResponse, errorResponse } = require('../helpers/response')
const { validationResult } = require('express-validator')

const getUsers = async ( req, res ) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { status: true }
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(parseInt(desde))
            .limit(parseInt(limite))
    ])

    successResponse( req, res, {total, users} )
}

const addUser = async ( req, res ) => {
    
    const { name, email, password, rol } = req.body
    const user = new User({
        name, email, password, rol
    })
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync( password, salt )

    const data = await user.save()
    successResponse( req, res, data, 201 )
}

const updateUser = async ( req, res ) => {
    const { id } = req.params
    const { _id, password, google, email, ...rest } = req.body
    if ( password ) {
        const salt = bcrypt.genSaltSync()
        rest.password = bcrypt.hashSync( password, salt )
    } 
    const user = await User.findByIdAndUpdate( id, rest )
    successResponse( req, res, user, 200 )
}

const deleteUser = async ( req, res ) => {
    const { id } = req.params
    const user = await User.findByIdAndUpdate( id, {status: false} )
    successResponse( req, res, user )
}

module.exports = {
    addUser,
    updateUser,
    getUsers,
    deleteUser
}
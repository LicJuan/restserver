const { successResponse, errorResponse } = require("../helpers/response")
const bcrypt = require( 'bcryptjs' )
const User = require('../models/User')
const { tokenGenerate } = require("../helpers/tokenGenerate")
const login = async ( req, res ) => {
    const { email, password } = req.body
    try {

        const user = await User.findOne({ email })
        if( !user ) errorResponse( req, res, 'El email o password no son correctos', 400 )
        if( !user.status ) errorResponse( req, res, 'El usuario no existe', 400 )
        const validPassword = bcrypt.compareSync( password, user.password )
        if( !validPassword ) errorResponse( req, res, 'El email o el password no son correctos', 400 )

        const token = await tokenGenerate( user.id )
        const data = {
            user,
            token
        }
        successResponse( req, res, data, 200 )
    } catch (err) {
        console.log(err);
        errorResponse( req, res, err, 500 )
    }
}

module.exports = {
    login
}
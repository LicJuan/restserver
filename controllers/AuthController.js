const { successResponse, errorResponse } = require("../helpers/response")
const bcrypt = require( 'bcryptjs' )
const User = require('../models/User')
const { tokenGenerate } = require("../helpers/tokenGenerate")
const { verify } = require("../helpers/googleVerify")
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

const googleSignIn = async ( req, res ) => {
    const { id_token } = req.body
    try {
        const { name, email, img } = await verify( id_token )
        let user = await User.findOne({ email })
        if( !user ) {
            const data = { 
                name,
                email,
                password: ':p',
                img,
                google: true
            }
            user = new User(data)
            await user.save()
        }
        if( !user.status ) errorResponse( req, res, 'Usuario bloqueado', 401 )

        const token = await tokenGenerate( user.id )
        successResponse( req, res, { user, token } )
    } catch (err) {
        errorResponse( req, res, 'El token de google no es valido' )
    }
}
module.exports = {
    login, googleSignIn
}
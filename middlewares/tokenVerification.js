const jwt = require( 'jsonwebtoken' );
const { errorResponse } = require('../helpers/response');
const User = require('../models/User');

exports.tokenVerification = async ( req, res, next ) => {
    const token = req.header( 'x-token' )
    try {
        if( !token ) errorResponse( req, res, 'No se ha encontrado el token', 401 )
        const { uid } = jwt.verify( token, process.env.TOKEN_SECRET )
        
        const user = await User.findById( uid )

        if( !user ) errorResponse( req, res, 'El usuario no existe', 401 )

        if( !user.status ) errorResponse( req, res, 'El usuario no esta autorizado', 401 )

        req.user = user
        next()
        
    } catch (err) {
        console.log(err);
        errorResponse( req, res, 'El token no es valido', 401 )
    }
}
const { errorResponse } = require("../helpers/response")

exports.isAdmin = ( req, res, next ) => {

    const userReq = req.user
    if( !userReq ) errorResponse( req, res, 'Debe validarse el token primero', 500 )
    const { name, rol } = userReq
    if( rol !== 'ADMIN_ROLE' ) errorResponse( req, res, `El usuario ${ name } no tiene el rol para esta accion`, 401 )
    next()
}

exports.hasRoles = ( ...roles ) => {
    return ( req, res, next ) => {
        if( !req.user ) errorResponse( req, res, 'Debe validarse el token primero', 500 )
        if( !roles.includes( req.user.rol ) ) errorResponse( req, res, `Para realizar esta accion debe contar con los roles de ${roles}` )
        next()
    }
}
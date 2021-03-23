const jwt = require( 'jsonwebtoken' )

exports.tokenGenerate = ( uid = '' ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { uid }
        jwt.sign( payload, process.env.TOKEN_SECRET, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if( err ) {
                console.log(err);
                reject( 'Error en la generacion del token' )
            } else {
                resolve( token )
            }
        })
    })
}
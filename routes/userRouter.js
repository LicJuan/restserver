const router = require( 'express' ).Router()

router.get( '/', ( req, res ) => {
    res.json({
        msg: 'Peticion Get'
    })
})
router.post( '/', ( req, res ) => {
    const body = req.body
    res.json({
        msg: 'Peticion Post',
        body
    })
})
router.put( '/:id', ( req, res ) => {
    const body = req.body
    res.json({
        msg: 'Peticion Put'
    })
})
router.patch( '/', ( req, res ) => {
    const body = req.body
    res.json({
        msg: 'Peticion Patch'
    })
})
router.delete( '/', ( req, res ) => {
    res.json({
        msg: 'Peticion Delete'
    })
})

module.exports = router
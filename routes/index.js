const router = require('express').Router()
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const searchRouter = require('./search')

router.use( '/users', userRouter )
router.use( '/auth', authRouter )
router.use( '/categories', categoryRouter )
router.use( '/products', productRouter )
router.use( '/search', searchRouter )

module.exports = router
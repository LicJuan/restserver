const { search } = require('../controllers/SearchController')

const router = require('express').Router()

router.get( '/:collection/:term', search )

module.exports = router
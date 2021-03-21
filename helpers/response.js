const successResponse = ( req, res, data = '', code = 200 ) => {
    return res.status( code ).json({data})
}
const errorResponse = ( req, res, data = '', code = 500 ) => {
    return res.status( code ).json({data})
}

module.exports = {
    successResponse, errorResponse
}
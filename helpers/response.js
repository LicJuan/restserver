exports.successResponse = ( req, res, data = '', code = 200 ) => {
    return res.status( code ).json({data})
}
exports.errorResponse = ( req, res, data = '', code = 500 ) => {
    return res.status( code ).json({data})
}
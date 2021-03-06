const { Schema, model } = require( 'mongoose' )
const CategorySchema = new Schema({
    
    name: {
        type: String,
        required: [ true, 'El nombere es obligatorio' ]
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})
module.exports = model( 'Category', CategorySchema )

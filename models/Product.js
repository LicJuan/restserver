const { Schema, model } = require( 'mongoose' )
const ProductSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        unique: true
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
})

ProductSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject()
    return data
}

module.exports = model( 'Product', ProductSchema )
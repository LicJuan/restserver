const mongoose = require( 'mongoose' )
const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.log(err);
        throw new Error('Error en la conexion con la base de datos')
    }
}

module.exports = {
    dbConnection
}
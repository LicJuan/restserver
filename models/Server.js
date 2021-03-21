const express = require('express')
const cors = require('cors')
const routes = require('../routes')
const { dbConnection } = require('../db/config')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        // db connect
        this.dbConnect()
        // middlewares
        this.middlewares()
        // routes
        this.routes()
    }

    async dbConnect () {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use( express.static( 'public' ) )
        this.app.use( express.urlencoded({extended: false}) )
        this.app.use( express.json() )
    }

    routes() {
        this.app.use( '/api', routes )
    }

    listen() {
        this.app.listen( this.port, err => {
            if( err ) console.log('Error in the server', err);
            console.log(`Listen in port ${ this.port }`);
        })
    }

}

module.exports = Server
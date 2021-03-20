const Server = require('./models/Server')
require('dotenv').config()

const app = new Server()
app.listen()
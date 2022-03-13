const express = require ("express")
require('dotenv').config()
const mongoose = require ("mongoose")

const bodyParser = require ("body-parser")
const cookieParser = require ("cookie-parser")
const cors = require ("cors")

const app = express()


app.use (bodyParser.json())
app.use (cookieParser())
app.use (cors())


const PORT = process.env.PORT

mongoose.connect(process.env.URL)
    .then(app.listen(PORT, () =>
        console.log(`Listening on PORT ${PORT}`)))
    .catch((error) => console.log('Error: ', error.message))


const routes = require("./routes/user")

app.use ("/api", routes)

const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
//login
const morgan = require('morgan')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
//load config file 
dotenv.config({path: './config/config.env'})
const app = express()

connectDB()

//Logging while on dev mode
if(process.env.NODE_ENV === 'development' ){
    app.use(morgan('dev'))
}

//Handelbars template engine
// to use 'hbs' instead of 'handlebars' as extension
app.engine('.hbs', exphbs.engine({dafaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

// routes
app.use('/', require('./routes/index'))
// static folder
app.use(express.static(path.join(__dirname, 'public')))

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('port running'))


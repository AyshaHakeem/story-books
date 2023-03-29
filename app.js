const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan') //login
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
//load config file 
dotenv.config({path: './config/config.env'})
const app = express()

// Passport config
require('./config/passport')(passport)

connectDB()

//Logging while on dev mode
if(process.env.NODE_ENV === 'development' ){
    app.use(morgan('dev'))
}

//Handelbars template engine
// to use 'hbs' instead of 'handlebars' as extension
app.engine('.hbs', exphbs.engine({dafaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false, // to  not save a session if nothing is modified
    saveUninitialized: true        // save every new session
}))

// Passport middelware
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
// static folder
app.use(express.static(path.join(__dirname, 'public')))

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('port running'))


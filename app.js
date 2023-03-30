const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan') //login
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
//load config file 
dotenv.config({path: './config/config.env'})
const app = express()

// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Passport config
require('./config/passport')(passport)

connectDB()

//Logging while on dev mode
if(process.env.NODE_ENV === 'development' ){
    app.use(morgan('dev'))
}

// Helpers
const {formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs')

//Handelbars template engine
// to use 'hbs' instead of 'handlebars' as extension
app.engine(
    '.hbs',  
    exphbs.engine({
        helpers: {
            formatDate,
            stripTags, 
            truncate,
            editIcon,
            select
        },
        dafaultLayout: 'main', 
        extname: '.hbs'
        })
)
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false, // to  not save a session if nothing is modified
    saveUninitialized: true,        // save every new session
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL})   // store session data to db.sessions
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Global variable
app.use((req,res,next)=>{
    res.locals.user = req.user || null
    next()
})


// routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('port running'))


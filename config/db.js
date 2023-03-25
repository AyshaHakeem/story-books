const mongoose = require('mongoose')
async function connectDB(){
    try{
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URL,{
             useUnifiedTopology : true
        })
        console.log('Connected to Database')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
    
}

module.exports = connectDB
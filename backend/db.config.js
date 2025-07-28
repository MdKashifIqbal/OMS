const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("DB connected")
        })
        .catch((err)=>{
            console.log("error",err.message)
        })
}

module.exports = connectToDB
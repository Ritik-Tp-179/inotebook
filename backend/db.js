const mongoose = require("mongoose")

const mongooseUrl = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongooseUrl, { useNewUrlParser: true })
}

module.exports = connectToMongo; 
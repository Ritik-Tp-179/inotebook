const express = require("express")
const app = express()
const cors = require("cors")
const connectToMongo = require("./db")

app.use(cors())
app.use(express.json())
connectToMongo()

// Available routes
// app.get("/",(req,res)=>{
//     res.send("hello ")
// })
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(4000,()=>{
    console.log("Server started at port 4000.")
})
const express = require('express');
const connectToDB = require('./database');
const app = express();
const dotenv=require('dotenv')
const cors = require('cors')

connectToDB()
dotenv.config()

const PORT = process.env.PORT;
app.use( express.json())
app.use(cors())


app.get("/", (req,res)=>{
   res.send({
    message:"welcome to Home Page"
   })
})

app.use("/api/v3.2/auth", require('./router/user.router'))

 app.use("/api/v3.2/note", require('./router/note.router'))

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

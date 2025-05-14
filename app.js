const express = require('express')
const userRouter = require('./routes/user.routes')
// to access the .env file variables we use dotenv
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require("./config/db")
connectToDB();
const cookieParser = require('cookie-parser');
const indexRouter = require("./routes/index.routes")
const app = express()

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.get("/",(req,res)=>{
//     res.render("index");
// })                      

app.use('/',indexRouter)
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})



// We use userRouter or user.routes.js thats why we use app.use not app.get

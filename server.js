const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter')
const productRouter = require("./routers/productRouter")
const errorHandler = require('./middlewares/errorMiddleware')


const app = express()

//Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: ["*"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use('/api/user', userRouter)
app.use("/api/product", productRouter)

const port = process.env.PORT
const db = process.env.MONGODB_URL

app.use(errorHandler)
mongoose.connect(db)
.then(()=>{
    console.log("Mongodb conection established")
    app.listen(port, ()=>{
        console.log(`Server is listening at Port ${port}`)
    })
})
.catch((error)=>{
    console.log(error)
})

const dotenv= require('dotenv')
const express=require('express')
const app=express()

// const User=require('./model/userSchema')

dotenv.config({path:'./config.env'})
require('./db/connection')
const PORT=process.env.PORT

app.use(express.json()) //bhai express json data nhi smjhta thats why ise btado jpo bhi data aae use json m convert krke dikha dena

app.use(require('./router/auth'))  //used to set up middleware for your app

app.get('/',(req,res)=>{
    res.send('This is the home page')
})

app.listen(PORT,(req,res)=>{
    console.log(`listening at port ${PORT}`);
})
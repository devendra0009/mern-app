const express=require('express')
const bcrypt=require('bcryptjs')
const router=express.Router()

//connecting databse to send the req body directly to database
require('../db/connection')
const User=require('../model/userSchema')

router.get('/',(req,res)=>{
    res.send('This is the home page by router')
})

//ASYNC-AWAIT METHOD
router.post('/register',async (req,res)=>{
   const {name,email,phone,password,cpassword}= req.body
   if(!name||!email||!phone||!password||!cpassword){
    return res.status(422).json({err:"Please fill all the fields"})
   }

   try {
    const userExist = await User.findOne({email:email})

    if(userExist) return res.status(422).json({err:"User already exist"})
    else if(password!=cpassword) return res.status(422).json({err:"Password doesn't match"})
    else{
        const user=new User({name,email,phone,password,cpassword})
        //yha pr password decyrpt krana hoga save krne se phle jo ki user creating k vqt hi kradege
        await user.save()
        res.status(201).json({success:"User registered succefully"})
        }
    } 
    catch (err) {
    res.status(500).json({error:"Internal server error"})
    }
})


router.post('/login',async (req,res)=>{
    const {email,password}= req.body
    if(!email||!password){
     return res.status(422).json({err:"Please fill all the fields"})
    }
 
    try {
     const userExist = await User.findOne({email:email})
 
     if(!userExist) return res.status(422).json({err:"Invalid Credentials"})

     const passComp=await bcrypt.compare(password,userExist.password)
     //agr pasComp false deta hai means password doesn't match
     if(!passComp)  return res.status(422).json({err:"Invalid Credentials"})
    
     res.status(201).json({success :"Login Successful",message:userExist})
     } 
     catch (err) {
     res.status(500).json({error:"Internal server error"})
     }
 })

module.exports=router








/*  Some Comments

//THESE LINES WERE REDUCED 
const userRegistered=await user.save()
if(userRegistered) res.status(201).json({success:"User registered succefully"})
else res.status(500).json({error:"Failed to register"})
}
//TO
await user.save()
res.status(201).json({success:"User registered succefully"})


//using promises adding data to dataBase
router.post('/register',(req,res)=>{
   const {name,email,phone,password,cpassword}= req.body
   if(!name||!email||!phone||!password||!cpassword){
    return res.status(422).json({err:"Please fill all the fields"})
   }
   //agr user exist krta hai to don't register 
   //left email database vala and right is entered email
   User.findOne({email:email})
   .then((userExist)=>{
        if(userExist)  //agr user milta hai to
        return res.status(422).json({err:"User already exist"})

        //now if user doesn't exist uska ek document create krna hoga
        //if both the key and values entered are same then no need to write it like name:name
        const user=new User({name,email,phone,password,cpassword})
        user.save().then(()=>{
         res.status(201).json({success:"User registered succefully"})
        }).catch(err=> res.status(500).json({error:"Failed to register"}))
   }).catch(err=> res.status(500).json({error:"Internal server error"}))

})




// console.log(req.body);
// res.send({message:req.body})  //age user jo bhi data fill krega use mne show krwa dia , now re.body ki jgh hm frontend pr user se data le skte hai or database m dal skte hai using this method
// res.send('register page')
*/
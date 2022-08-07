const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const {Schema}=mongoose
const userSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true 
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
})

//hashing the password
//means userSchema me save krne se phle 
userSchema.pre('save', async function(next){
    //this is a middleware and next here is save function
    //agr iska password(this means jisne isko call kia hai) modify kia hai to usko hash krde with 12 salting layers
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12)
        this.cpassword=await bcrypt.hash(this.cpassword,12)
    }
    next()
})

const User=mongoose.model('USER',userSchema)  //means USER naam se save krde ek document whose schema should be like userSchema
module.exports=User
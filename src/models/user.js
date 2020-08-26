const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    age : {
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be positive number")
            }
        }
    },
    email : {
        type:String,
        unique:true,
        require:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address")
            }
        }
    },
    password:{
        type : String,
        required: true,
        trim: true,
        minlength : 7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password should not include password text")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avator:{
        type:Buffer   
    }
}, {
    timestamps:true
})

userSchema.virtual('tasks', {
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.generateAuthToken = async function () {
    const user  = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECERT)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avator
    return userObject
}
userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to Login')
    }

    const  isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to Login')
    }
    return user
}

//save the plain password before save
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log("Just before saving")
    next()
})

//Delete User tasks when user deleted
userSchema.pre("remove", async function(next) {
    const user = this
    Task.deleteMany( { owner:user._id})
    
    next()
})
const User = mongoose.model('User', userSchema)

module.exports=User

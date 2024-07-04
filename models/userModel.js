const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
            name: {
                type: String,
                required: [true, "Please add a name"]
            },
            email: {
                type: String,
                unique: true,
                required: [true, "Please add your email"],
                trim: true,
                match: [
                    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                    "Please add a valid email"
                ]
            },
            password : {
                type: String,
                required: [true, "Please enter a password"],
                minLength : [6, "Password must be upto 6 characters"],
            },
            role: {
                type: String,
                required: [true],
                default: "customer",
                enum : ["customer", "admin"],
            },
            photo: {
                type: String,
                required: [true],
                default: 'https://th.bing.com/th/id/OIP.4Q7-yMnrlnqwR4ORH7c06AHaHa?rs=1&pid=ImgDetMain'
            },
            phone: {
                type: String,
                default: '+92'
            },
            address: 
            {
                type: Object
            }
    },
    {
        timestamps: true
    })

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(this.password, salt)
    this.password = hashedPassword

    next()
})

module.exports= mongoose.model('User', userSchema)
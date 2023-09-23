import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        Type: String,
        required: true
    },
    lastName:{
        Type: String,
        required: true
    },
    phone:{
        Type: String,
        required: true,
        unique: true
    },
    email:{
        Type: String,
        required: true,
        unique: true
    },
    password: {
        Type: String,
        required: true
    }

},{timestamps: true})

const User = mongoose.model('User', userSchema)

export default User
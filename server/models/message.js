import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
    content:{
        Type: String,
        required: true
    },
    auteur: {
        Type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sujectId: {
        Type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }
},{timestamps: true})

const Message = mongoose.model('Message', messageSchema)
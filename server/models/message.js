import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sujectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }
},{timestamps: true})

const Message = mongoose.model('Message', messageSchema)
export default Message
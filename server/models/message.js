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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
},{timestamps: true})

const Message = mongoose.model('Message', messageSchema)
export default Message
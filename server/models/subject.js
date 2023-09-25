import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
        required: true,
    },
    description: String,
    auteur:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    // dateHeure: DateTime
},{timestamps: true})

const Subject = mongoose.model('Subject', subjectSchema)

export default Subject
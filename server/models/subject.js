import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    title:{
        Type: String,
        required: true,
        unique: true
    },
    description: String,
    auteur:{
        Type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // dateHeure: DateTime
},{timestamps: true})

const Subject = mongoose.model('Subject', subjectSchema)

export default Subject
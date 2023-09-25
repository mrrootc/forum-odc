import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  picture: String,
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }
})

const Category = mongoose.model('Category', categorySchema)

export default Category
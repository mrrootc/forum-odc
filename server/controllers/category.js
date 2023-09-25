import Category from "../models/category.js";

export const createCategory = async (req, res) => {
    const { title, picture, subject } = req.body
    try {
        const newCategory = new Category({
            title, picture, subject
        })
        const category = newCategory.save()
        res.json(category)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
import Category from "../models/category.js";

/**
 * Creates a new category with the provided title, picture, and subject.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} If there is an error saving the new category.
 */
export const createCategory = async (req, res) => {
    const { title, picture, subject } = req.body
    try {
        const newCategory = new Category({
            title, picture, subject
        })
        const category = newCategory.save()
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find()
        res.status(200).json(categories)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

/**
 * Deletes a category from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} If there is an error deleting the category.
 */
export const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        await Category.findByIdAndDelete(id)
        res.json("Categorie supprimé avec succès")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getCategoryBySubjectId = async (req, res) =>{
    const { id } = req.params
    try{
        const categories = await Category.find({ subject: id})
        res.status(200).json(categories)
    }
    catch(error){
         res.status(500).json({message: error.message})
    }
}
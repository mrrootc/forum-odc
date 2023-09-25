import Category from "../models/category.js";

/**
 * Creates a new category with the provided title, picture, and subject.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error saving the new category.
 */
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

/**
 * Deletes a category from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
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
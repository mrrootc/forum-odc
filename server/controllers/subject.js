import Subject from "../models/subject.js";

/**
 * Creates a new subject with the provided title, picture, description, and author.
 * @param {Object} req - The request object containing the subject details in the body.
 * @param {Object} res - The response object to send the result.
 * @returns None
 * @throws {Error} If there is an error while creating the subject.
 */
export const createSubject = async (req, res) => {
    const {title, picture, description, auteur} = req.body

    try{
        const newSubject = new Subject({
            title,
            picture,
            description,
            auteur
        })
        const subject = await newSubject.save()
        res.status(201).json({
            subject,
            message: "Sujet crée avec succès"
        })
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

/**
 * Deletes a subject from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error deleting the subject.
 */
export const deleteSuject = async (req, res) => {
    const { id } = req.params
    try{
        await Subject.findByIdAndRemove(id)
        res.json("Suject supprimé avec succès")
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getAllSubjects = async (req, res) => {
    try {
        const subject = await Subject.find()
        res.status(200).json(subject)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
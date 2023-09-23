import Subject from "../models/subject.js";

export const createSubject = async (req, res) => {
    const {title, description, auteur} = req.body

    try{
        const newSubject = new Subject({
            title,
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

export const deleteSuject = async (req, res) => {
    const { id } = req.params
    try{
        await Subject.findByIdAndRemove(id)
        res.json("Suject supprimé avec succès")
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
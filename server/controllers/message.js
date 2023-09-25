import Message from "../models/message.js";

export const createMessage = async (req, res) => {
    const {content, auteur, subject } = req.body
    const messageN = {
        content,
        auteur, 
        subject
    }
    try{
        const newMessage = new Message(messageN)
        const message = await newMessage.save()
        res.status(201).json(message)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const readAllMessage = async (req, res) => {
    try{
        const message = await Message.find()
        res.json(message)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const readMessageById = async (req, res) => {
    const { id } = req.params
    try{
       const message = await Message.findById(id)
       res.json(message)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const updateMessage = async (req, res) => {
    const { id } = req.params
    const { content } = req.body
    try{
        const message = await Message.findByIdAndUpdate(id, content, { new: true})
        res.json(message)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params
    try{
        await Message.findByIdAndDelete(id)
        res.json("Message supprimé avec succès")
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
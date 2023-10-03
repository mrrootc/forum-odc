import Message from "../models/message.js";

/**
 * Creates a new message and saves it to the database.
 * @param {Object} req - The request object containing the message data in the body.
 * @param {Object} res - The response object to send the result back to the client.
 * @returns None
 */
export const createMessage = async (req, res) => {
  const { content, auteur, category } = req.body;
  const messageN = {
    content,
    auteur,
    category,
  };
  try {
    const newMessage = new Message(messageN);
    const message = await newMessage.save();
    console.log(message);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves all messages from the database and sends them as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error retrieving the messages from the database.
 */
export const readAllMessage = async (req, res) => {
  try {
    const message = await Message.find();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves a message by its ID and sends it as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error retrieving the message or sending the response.
 */
export const readMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id);
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates a message with the specified ID and content.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error updating the message.
 */
export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const message = await Message.findByIdAndUpdate(id, content, { new: true });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes a message with the specified ID from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error deleting the message.
 */
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await Message.findByIdAndDelete(id);
    res.json("Message supprimé avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves messages from the database based on the provided category ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error retrieving the messages from the database.
 */
export const getMessageByIdCat = async (req, res) => {
  const { idcat } = req.params;
  try {
    const messages = await Message.find({ category: idcat });
    if(!messages){
        res.json("Pas de categorie")
    }else{
        res.status(200).json(messages)
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

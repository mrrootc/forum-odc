import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import sendMail from "../utils/sendMail.js";

/**
 * Registers a new user with the provided information.
 * @param {Object} req - The request object containing the user data.
 * @param {Object} res - The response object to send the result of the registration process.
 * @returns None
 * @throws {Error} If there is an error during the registration process.
 */
export const register = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const code = Math.floor(100000 + Math.random() * 900000);
  try {
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashPassword,
      verifCode: code,
    });
    const user = await newUser.save();

    sendMail(
      user.email,
      "Confirmation de votre adresse email",
      `Votre code de confirmation est :<mark>${code}</mark> `
    );
    res.status(201).json("Veuillez vérifier votre boîte de réception pour le code de confirmation.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Validates the email and verification code provided in the request body.
 * If the email and code match a user in the database, the user's "verified" field
 * is set to true and the response status is set to 200 with a success message.
 * If the email and code do not match a user in the database, the response status
 * is set to 400 with an error message.
 * If an error occurs during the validation process, the response status is set to
 * 500 with an error message.
 * @param {Object} req - The request object containing the email and code.
 * @param {Object} res - The response object to send the result.
 * @returns None
 */
export const validation = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email, verifCode: code });

    if (user) {
      user.verified = true;
      await user.save();
      res.status(200).send("Email vérifié avec succès.");
    } else {
      res.status(400).send("Code de confirmation invalide.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la validation.");
  }
};

/**
 * Handles the login functionality by checking the provided email and password against
 * the user database. If the credentials are valid and the user is verified, a JWT token
 * is generated and returned along with the user information.
 * @param {Object} req - The request object containing the email and password.
 * @param {Object} res - The response object to send the result.
 * @returns None
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json("invalid credentials");
    } else {
     if(user.verified != true){
      res.json("Veuillez validez votre compte à l'aide de code de confirmation")
     }else{
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.json("invalide credentials");
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        res.status(200).json({ token, user });
      }
     }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves all users from the database and sends a JSON response with and user data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error retrieving the users from the database.
 */
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates a user's phone and email information in the database.
 * @param {Object} req - The request object containing the user's ID in the params and the updated phone and email in the body.
 * @param {Object} res - The response object to send the updated user information or an error message.
 * @returns None
 */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { phone, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { phone, email },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes a user from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error deleting the user.
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndRemove(id);
    res.json("Utilisation supprimé avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

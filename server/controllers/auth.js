import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashPassword,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json("invalid credentials");
    } else {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ counts: user.lentgh, users: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try{
    await User.findByIdAndRemove(id)
    res.json("Utilisation supprimé avec succès")
  }catch(error){
    res.status(500).json({message: error.message})
  }
}
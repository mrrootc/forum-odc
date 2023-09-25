import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import sendMail from "../utils/sendMail.js";

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
  const { id } = req.params;
  try {
    await User.findByIdAndRemove(id);
    res.json("Utilisation supprimé avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

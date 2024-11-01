import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import { json } from "express";

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res
        .status(400)
        .send(`El Correo ${email} ya se encuentra registrado`);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: passwordHash, username });

    const userSaved = await newUser.save();

    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      createAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid credential" });
    }

    const token = await createAccesToken({ id: userFound._id });
    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expiresIn: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400), json({ message: "user not found" });

  return res.json({
    id: userFound._id,
    usaername: userFound.username,
    createAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

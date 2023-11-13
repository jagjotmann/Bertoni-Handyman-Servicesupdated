const express = require("express");
const router = express.Router();
import User from "../models/userModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

router.post("/adduser", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = new User({
      contactInfo: {
        email,
      },
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User added succesfully", user: newUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

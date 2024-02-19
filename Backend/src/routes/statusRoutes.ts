const express = require("express");
const router = express.Router();
import StatusModel from "../models/statusModel"; // Adjust the import path as necessary
import { Request, Response } from "express";
import mongoose, { FilterQuery } from "mongoose";

// Route to create a new status
router.post("/create", async (req: Request, res: Response) => {
  const statusData = req.body;
  try {
    const newStatus = new StatusModel(statusData);
    await newStatus.save();
    res
      .status(201)
      .json({ message: "Status created successfully", status: newStatus });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all statuses
router.get("/all", async (req: Request, res: Response) => {
  try {
    const statuses = await StatusModel.find();
    res.status(200).json(statuses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:statusId", async (req: Request, res: Response) => {
  const { statusId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(statusId)) {
      return res.status(400).json({ message: "Invalid quote ID" });
    }

    const status = await StatusModel.findById(statusId);
    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json(status);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a specific status by ID
router.put("/:statusId", async (req: Request, res: Response) => {
  const { statusId } = req.params;
  const updatedStatusData = req.body;

  try {
    const updatedStatus = await StatusModel.findByIdAndUpdate(
      statusId,
      updatedStatusData,
      { new: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({ message: "Status not found" });
    }
    res
      .status(200)
      .json({ message: "Status updated successfully", status: updatedStatus });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a specific status by ID
router.delete("/:statusId", async (req: Request, res: Response) => {
  const { statusId } = req.params;

  try {
    const deletedStatus = await StatusModel.findByIdAndRemove(statusId);
    if (!deletedStatus) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json({ message: "Status deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

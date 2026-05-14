import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Todo from "./models/Todo.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// MongoDB connection (safe for Vercel)
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URL);
};

connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const newTodo = await Todo.create({ text: req.body.text });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default app;
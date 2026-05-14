import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Todo from "./models/Todo.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });

  await newTodo.save();

  res.json(newTodo);
});

export default app;
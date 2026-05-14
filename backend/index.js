import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Todo from "./models/Todo.js";
import dotenv from "dotenv";
import process from "process";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// Get Todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});


// Add Todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });

  await newTodo.save();

  res.json(newTodo);
});


app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});
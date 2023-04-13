import { RequestHandler } from "express";

import { Todo } from "../models/todo";

const TOOs: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const id = Math.random().toString();
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(id, text);

  TOOs.push(newTodo);

  res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TOOs });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedTxt = (req.body as { text: string }).text;

  const todoIdx = TOOs.findIndex((todo) => todo.id === todoId);

  if (todoIdx < 0) {
    throw new Error("could not find todo");
  }

  TOOs[todoIdx] = new Todo(TOOs[todoIdx].id, updatedTxt);

  res.json({ message: "updated!", updatedTodo: TOOs[todoIdx] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;
  const todoIdx = TOOs.findIndex((todo) => todo.id === todoId);

  if (todoIdx < 0) {
    throw new Error("Could not find todo!");
  }

  TOOs.splice(todoIdx, 1);
  res.json({ message: "Todo deleted!" });
};

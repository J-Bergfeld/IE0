import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  findAll,
  findByName,
  findByJob,
  findByNameAndJob,
  findById,
  addUser,
  deleteById
} from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  let promise;

  if (name !== undefined && job !== undefined) {
    promise = findByNameAndJob(name, job);
  } else if (name !== undefined) {
    promise = findByName(name);
  } else if (job !== undefined) {
    promise = findByJob(job);
  } else {
    promise = findAll();
  }

  promise
    .then((users) => res.send({ users_list: users }))
    .catch((error) => res.status(500).send(error));
});

app.get("/users/:id", (req, res) => {
  findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/users", (req, res) => {
  addUser(req.body)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => res.status(500).send(error));
});

app.delete("/users/:id", (req, res) => {
  deleteById(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
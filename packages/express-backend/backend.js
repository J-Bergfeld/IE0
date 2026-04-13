import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    },
    {
      id: "qwe123",
      name: "Cindy",
      job: "Zookeeper"
    }
  ]
};

const findUserById = (id) => {
  return users.users_list.find((user) => user.id === id);
};

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.users_list.splice(index, 1);
  return true;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  let result = users.users_list;

  if (name !== undefined) {
    result = result.filter((user) => user.name === name);
  }

  if (job !== undefined) {
    result = result.filter((user) => user.job === job);
  }

  res.send({ users_list: result });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = deleteUserById(id);

  if (!deleted) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
import User from "../models/user.js";

export function findAll() {
  return User.find();
}

export function findByName(name) {
  return User.find({ name: name });
}

export function findByJob(job) {
  return User.find({ job: job });
}

export function findByNameAndJob(name, job) {
  return User.find({ name: name, job: job });
}

export function findById(id) {
  return User.findById(id);
}

export function addUser(user) {
  const newUser = new User({
    name: user.name,
    job: user.job
  });

  return newUser.save();
}

export function deleteById(id) {
  return User.findByIdAndDelete(id);
}
const users = require("../data/users");

let nextId = users.length + 1;

function findAll(role) {
  if (role) return users.filter((u) => u.role === role);
  return users;
}

function findById(id) {
  return users.find((u) => u.id === id);
}

function emailExists(email, excludeId = null) {
  return users.some((u) => u.email === email && u.id !== excludeId);
}

function create({ name, email, role }) {
  const newUser = {
    id: nextId++,
    name,
    email,
    role: role || "user",
    createdAt: new Date().toISOString().split("T")[0],
  };
  users.push(newUser);
  return newUser;
}

function update(id, fields) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const { name, email, role } = fields;
  if (name !== undefined) users[index].name = name;
  if (email !== undefined) users[index].email = email;
  if (role !== undefined) users[index].role = role;
  return users[index];
}

function remove(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

module.exports = { findAll, findById, emailExists, create, update, remove };

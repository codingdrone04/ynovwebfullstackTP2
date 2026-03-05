const express = require("express");
const router = express.Router();
const users = require("../data/users");

let nextId = users.length + 1;

// GET /api/users — liste tous les utilisateurs
router.get("/", (req, res) => {
  res.status(200).json(users);
});

// GET /api/users/:id — récupère un utilisateur par son id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.status(200).json(user);
});

// POST /api/users — crée un nouvel utilisateur
router.post("/", (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Les champs name et email sont requis" });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    role: role || "user",
    createdAt: new Date().toISOString().split("T")[0],
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id — met à jour un utilisateur existant
router.put("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  const { name, email, role } = req.body;
  users[index] = { ...users[index], name, email, role };
  res.status(200).json(users[index]);
});

// DELETE /api/users/:id — supprime un utilisateur
router.delete("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;

const express = require("express");
const router = express.Router();
const users = require("../data/users");

let nextId = users.length + 1;

// GET /api/users — liste tous les utilisateurs
router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// GET /api/users/:id — récupère un utilisateur par son id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
  }
  res.status(200).json({ success: true, data: user });
});

// POST /api/users — crée un nouvel utilisateur
router.post("/", (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Les champs name et email sont requis" });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    role: role || "user",
    createdAt: new Date().toISOString().split("T")[0],
  };

  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// PUT /api/users/:id — mise à jour partielle (id et createdAt non modifiables)
router.put("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
  }

  const { name, email, role } = req.body;
  if (name !== undefined) users[index].name = name;
  if (email !== undefined) users[index].email = email;
  if (role !== undefined) users[index].role = role;

  res.status(200).json({ success: true, data: users[index] });
});

// DELETE /api/users/:id — supprime un utilisateur
router.delete("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
  }

  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;

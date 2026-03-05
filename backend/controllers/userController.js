const User = require("../models/userModel");

function getAll(req, res) {
  const result = User.findAll(req.query.role);
  res.status(200).json({ success: true, count: result.length, data: result });
}

function getOne(req, res) {
  const user = User.findById(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
  }
  res.status(200).json({ success: true, data: user });
}

function create(req, res) {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Les champs name et email sont requis" });
  }
  if (User.emailExists(email)) {
    return res.status(409).json({ success: false, message: "Cet email est déjà utilisé" });
  }
  const newUser = User.create({ name, email, role });
  res.status(201).json({ success: true, data: newUser });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  if (!User.findById(id)) {
    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
  }
  const { email } = req.body;
  if (email !== undefined && User.emailExists(email, id)) {
    return res.status(409).json({ success: false, message: "Cet email est déjà utilisé" });
  }
  const updated = User.update(id, req.body);
  res.status(200).json({ success: true, data: updated });
}

function remove(req, res) {
  const removed = User.remove(parseInt(req.params.id));
  if (!removed) {
    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
  }
  res.status(204).send();
}

module.exports = { getAll, getOne, create, update, remove };

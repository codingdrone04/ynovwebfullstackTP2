const mongoose = require("mongoose");
const User = require("../models/userModel");

// Bonus A — pagination + Bonus B — recherche par nom
async function getAll(req, res, next) {
  try {
    const { role, search, page = 1, limit } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (search) filter.name = new RegExp(search, "i");

    const totalCount = await User.countDocuments(filter);

    let query = User.find(filter);

    if (limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const totalPages = Math.ceil(totalCount / limitNum);
      query = query.skip((pageNum - 1) * limitNum).limit(limitNum);
      const users = await query;
      return res.status(200).json({
        success: true,
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages,
        data: users,
      });
    }

    const users = await query;
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
}

async function getOne(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID invalide" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Les champs name et email sont requis" });
    }
    const user = await User.create({ name, email, role });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID invalide" });
    }
    const { _id, createdAt, ...fields } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, fields, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID invalide" });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, getOne, create, update, remove };

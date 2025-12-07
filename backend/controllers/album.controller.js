const { Album, Media } = require("../models");
const { Op } = require("sequelize");
const { canAccess } = require("../services/access.service");


exports.getAll = async (req, res) => {
  try {
    const {
      search = "",
      year = "",
      department = "",
      event = "",
      visibility = "",
      albumType = "",
      page = 1,
      limit = 9,
    } = req.query;

    const where = {};

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    if (year) where.year = year;
    if (department) where.department = department;
    if (event) where.event = event;
    if (visibility) where.visibility = visibility;
    if (albumType) where.albumType = albumType;

    const offset = (page - 1) * limit;

    const { rows, count } = await Album.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      items: rows,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.getOne = async (req, res) => {
  const allowed = await canAccess(req.user, "Album", req.params.id, "view");
  if (!allowed) return res.status(403).json({ message: "Access denied" });

  const album = await Album.findByPk(req.params.id);
  if (!album) return res.status(404).json({ message: "Not found" });

  res.json(album);
};


exports.create = async (req, res) => {
  try {
    const album = await Album.create({
      ...req.body,
      createdById: req.user.id,
    });
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.update = async (req, res) => {
  const album = await Album.findByPk(req.params.id);
  if (!album) return res.status(404).json({ message: "Not found" });

  await album.update(req.body);

  res.json(album);
};


exports.remove = async (req, res) => {
  await Album.destroy({ where: { id: req.params.id } });
  res.json({ message: "Album deleted" });
};

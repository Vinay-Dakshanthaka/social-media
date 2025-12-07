const { Media } = require("../models");
const { uploadToSpaces } = require("../services/uploader");
const { canAccess } = require("../services/access.service");

function detectType(mime) {
  if (mime.startsWith("image")) return "PHOTO";
  if (mime.startsWith("video")) return "VIDEO";
  if (mime.startsWith("audio")) return "AUDIO";
  return "DOCUMENT";
}

// GET all media for an album
exports.getAlbumMedia = async (req, res) => {
  const albumId = req.params.id;

  const allowed = await canAccess(req.user, "Album", albumId, "view");
  if (!allowed) return res.status(403).json({ message: "Access denied" });

  const media = await Media.findAll({ where: { albumId } });

  res.json(media);
};

// UPLOAD media
exports.uploadMedia = async (req, res) => {
  const albumId = req.params.id;

  const allowed = await canAccess(req.user, "Album", albumId, "upload");
  if (!allowed) return res.status(403).json({ message: "Access denied" });

  let uploaded = [];

  for (const file of req.files) {
    const fileUrl = await uploadToSpaces(file);

    const media = await Media.create({
      albumId,
      uploadedById: req.user.id,
      type: detectType(file.mimetype),
      fileUrl,
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    });

    uploaded.push(media);
  }

  res.json(uploaded);
};

// DELETE media
exports.remove = async (req, res) => {
  const media = await Media.findByPk(req.params.mediaId);
  if (!media) return res.status(404).json({ message: "Not found" });

  const allowed = await canAccess(req.user, "Media", media.id, "delete");
  if (!allowed) return res.status(403).json({ message: "Access denied" });

  await media.destroy();
  res.json({ message: "Media removed" });
};

// FEATURE toggle
exports.toggleFeatured = async (req, res) => {
  const { mediaId } = req.params;
  const { isFeatured } = req.body;

  const media = await Media.findByPk(mediaId);
  if (!media) return res.status(404).json({ message: "Not found" });

  media.isFeatured = isFeatured;
  await media.save();

  res.json(media);
};

// VISIBILITY update
exports.updateVisibility = async (req, res) => {
  const { mediaId } = req.params;
  const { visibility } = req.body;

  const media = await Media.findByPk(mediaId);
  if (!media) return res.status(404).json({ message: "Not found" });

  media.visibility = visibility;
  await media.save();

  res.json(media);
};

exports.getFeaturedMedia = async (req, res) => {
  try {
    const featured = await Media.findAll({
      where: { isFeatured: true },
      order: [["createdAt", "DESC"]],
    });

    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: "Failed to load featured media" });
  }
};

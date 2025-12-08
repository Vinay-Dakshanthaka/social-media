const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const mediactrl = require("../controllers/media.controller");

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media management API (Photos, Videos, Documents, Audio)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         albumId:
 *           type: string
 *         uploadedById:
 *           type: string
 *         type:
 *           type: string
 *           enum: [IMAGE, VIDEO, AUDIO, DOCUMENT]
 *         fileUrl:
 *           type: string
 *         fileName:
 *           type: string
 *         mimeType:
 *           type: string
 *         size:
 *           type: number
 *         isFeatured:
 *           type: boolean
 *         visibility:
 *           type: string
 *           enum: [PUBLIC, PRIVATE]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     UploadMediaResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         count:
 *           type: number
 *         files:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Media"
 */

/**
 * @swagger
 * /api/albums/{id}/media:
 *   get:
 *     summary: Get all media from an album
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of media files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Media"
 *       403:
 *         description: Access denied
 */
router.get("/albums/:id/media", auth, mediactrl.getAlbumMedia);

/**
 * @swagger
 * /api/albums/{id}/media:
 *   post:
 *     summary: Upload media files to an album
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: "#/components/schemas/UploadMediaResponse"
 *       403:
 *         description: Access denied
 */
router.post("/albums/:id/media", auth, upload.array("files"), mediactrl.uploadMedia);

/**
 * @swagger
 * /api/media/{mediaId}:
 *   delete:
 *     summary: Delete a specific media file
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: mediaId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Media removed
 *       404:
 *         description: Media not found
 *       403:
 *         description: Unauthorized
 */
router.delete("/media/:mediaId", auth, mediactrl.remove);

/**
 * @swagger
 * /api/media/{mediaId}/featured:
 *   patch:
 *     summary: Mark or unmark media as featured
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: mediaId
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isFeatured:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated media featured status
 *       404:
 *         description: Media not found
 */
router.patch("/media/:mediaId/featured", auth, mediactrl.toggleFeatured);

/**
 * @swagger
 * /api/media/{mediaId}/visibility:
 *   patch:
 *     summary: Change media visibility (public/private)
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: mediaId
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visibility:
 *                 type: string
 *                 enum: [PUBLIC, PRIVATE]
 *     responses:
 *       200:
 *         description: Media visibility updated
 *       404:
 *         description: Media not found
 */
router.patch("/media/:mediaId/visibility", auth, mediactrl.updateVisibility);

/**
 * @swagger
 * /api/media/featured:
 *   get:
 *     summary: Get all featured media
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Featured media list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Media"
 */
router.get("/media/featured", auth, mediactrl.getFeaturedMedia);

module.exports = router;

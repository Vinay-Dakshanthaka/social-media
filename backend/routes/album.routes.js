// const router = require("express").Router();
// const albumcontroller = require("../controllers/album.controller");

// // Album CRUD
// router.post("/", albumcontroller.createAlbum);
// router.get("/", albumcontroller.getAlbums);
// router.get("/:id", albumcontroller.getAlbumById);
// router.put("/:id", albumcontroller.updateAlbum);
// router.delete("/:id", albumcontroller.deleteAlbum);

// module.exports = router;


const router = require("express").Router();
const ctrl = require("../controllers/album.controller");
const auth = require("../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: Album management
 */

/**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Get all albums with filtering and pagination
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *       - in: query
 *         name: visibility
 *         schema:
 *           type: string
 *       - in: query
 *         name: albumType
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         default: 9
 *     responses:
 *       200:
 *         description: Paginated list of albums
 */
router.get("/", auth, ctrl.getAll);


/**
 * @swagger
 * /api/albums/{id}:
 *   get:
 *     summary: Get album by ID
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Album found
 *       403:
 *         description: Access denied
 *       404:
 *         description: Album not found
 */
router.get("/:id", auth, ctrl.getOne);


/**
 * @swagger
 * /api/albums:
 *   post:
 *     summary: Create a new album
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: string
 *               department:
 *                 type: string
 *               event:
 *                 type: string
 *               visibility:
 *                 type: string
 *               albumType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Album created successfully
 */
router.post("/", auth, ctrl.create);


/**
 * @swagger
 * /api/albums/{id}:
 *   put:
 *     summary: Update an album by ID
 *     tags: [Albums]
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
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Album updated
 *       404:
 *         description: Album not found
 */
router.put("/:id", auth, ctrl.update);


/**
 * @swagger
 * /api/albums/{id}:
 *   delete:
 *     summary: Delete an album by ID
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Album deleted
 */
router.delete("/:id", auth, ctrl.remove);

module.exports = router;


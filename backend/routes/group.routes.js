const router = require("express").Router();
const ctrl = require("../controllers/group.controller");
const auth = require("../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: API for managing user groups
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     GroupMember:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         groupId:
 *           type: string
 *         userId:
 *           type: string
 *         roleInGroup:
 *           type: string
 *           enum: [ADMIN, TEACHER, STUDENT]
 *         createdAt:
 *           type: string
 *     AddMemberRequest:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 */

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Group"
 */
router.get("/", auth, ctrl.getAll);

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Group"
 *     responses:
 *       201:
 *         description: Group created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", auth, ctrl.create);

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Get a single group by ID
 *     tags: [Groups]
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
 *         description: Group details
 *       404:
 *         description: Group not found
 */
router.get("/:id", auth, ctrl.getOne);

/**
 * @swagger
 * /api/groups/{id}/members:
 *   get:
 *     summary: Get group members
 *     tags: [Groups]
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
 *         description: List of group members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/GroupMember"
 */
router.get("/:id/members", auth, ctrl.getMembers);

/**
 * @swagger
 * /api/groups/{id}/members:
 *   post:
 *     summary: Add a member to the group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AddMemberRequest"
 *     responses:
 *       200:
 *         description: Member successfully added
 *       400:
 *         description: Missing userId
 */
router.post("/:id/members", auth, ctrl.addMember);

/**
 * @swagger
 * /api/groups/{id}/members/{userId}:
 *   delete:
 *     summary: Remove a member from the group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *       - name: userId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Member removed successfully
 */
router.delete("/:id/members/:userId", auth, ctrl.removeMember);

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: Delete a group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Group deleted
 */
router.delete("/:id", auth, ctrl.remove);

/**
 * @swagger
 * /api/groups/{id}:
 *   put:
 *     summary: Update group details
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Group"
 *     responses:
 *       200:
 *         description: Group updated
 *       404:
 *         description: Group not found
 */
router.put("/:id", auth, ctrl.update);

module.exports = router;

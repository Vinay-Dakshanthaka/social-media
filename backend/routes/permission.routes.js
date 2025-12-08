const router = require("express").Router();
const ctrl = require("../controllers/permission.controller");
const auth = require("../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: API for managing access rules and entity permissions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PermissionRequest:
 *       type: object
 *       required:
 *         - subjectType
 *         - subjectId
 *         - resourceType
 *         - resourceId
 *       properties:
 *         subjectType:
 *           type: string
 *           description: Type of user/role (e.g., "User", "Group", "Role")
 *         subjectId:
 *           type: string
 *           description: ID of the subject (userId / groupId / roleId)
 *         resourceType:
 *           type: string
 *           description: Entity type being controlled (e.g., Album, Media)
 *         resourceId:
 *           type: string
 *           description: ID of the resource being controlled
 *         view:
 *           type: boolean
 *           default: false
 *         upload:
 *           type: boolean
 *           default: false
 *         edit:
 *           type: boolean
 *           default: false
 *         delete:
 *           type: boolean
 *           default: false
 *
 *     PermissionResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         subjectType:
 *           type: string
 *         subjectId:
 *           type: string
 *         resourceType:
 *           type: string
 *         resourceId:
 *           type: string
 *         view:
 *           type: boolean
 *         upload:
 *           type: boolean
 *         edit:
 *           type: boolean
 *         delete:
 *           type: boolean
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Create or update permission rules for a resource
 *     description: Assigns access permissions (view, edit, delete, upload) for a specific user/role/group on a resource.
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PermissionRequest"
 *     responses:
 *       200:
 *         description: Permission created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PermissionResponse"
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Unauthorized request
 */
router.post("/", auth, ctrl.set);

module.exports = router;

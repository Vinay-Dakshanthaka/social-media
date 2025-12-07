const router = require("express").Router();
const ctrl = require("../controllers/group.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, ctrl.getAll);
router.post("/", auth, ctrl.create);
router.get("/:id", auth, ctrl.getOne);

// members
router.get("/:id/members", auth, ctrl.getMembers);
router.post("/:id/members", auth, ctrl.addMember);
router.delete("/:id/members/:userId", auth, ctrl.removeMember);
router.delete("/:id", auth, ctrl.remove);
router.put("/:id", auth, ctrl.update);


module.exports = router;

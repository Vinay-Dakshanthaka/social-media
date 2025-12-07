const router = require("express").Router();
const ctrl = require("../controllers/permission.controller");
const auth = require("../middleware/auth.middleware");
// const requireAdmin = require("../middleware/requireAdmin");

router.post("/", auth, ctrl.set);

module.exports = router;

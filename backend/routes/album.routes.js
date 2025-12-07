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


router.get("/", auth, ctrl.getAll);
router.get("/:id", auth, ctrl.getOne);
router.post("/", auth, ctrl.create);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;

const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const mediactrl = require("../controllers/media.controller");


router.get("/albums/:id/media", auth, mediactrl.getAlbumMedia);
router.post("/albums/:id/media", auth, upload.array("files"), mediactrl.uploadMedia);

router.delete("/media/:mediaId", auth, mediactrl.remove);

router.patch("/media/:mediaId/featured", auth, mediactrl.toggleFeatured);

router.patch("/media/:mediaId/visibility", auth, mediactrl.updateVisibility);

router.get("/media/featured", auth, mediactrl.getFeaturedMedia);


module.exports = router;

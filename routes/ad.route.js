const router = require("express").Router();
const auth = require("../middleware/auth");
const myAdCtrl = require("../controllers/ad.controller");

router.get("/myAd", auth,  myAdCtrl.getMyAd);

module.exports = router;
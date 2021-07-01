const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth");

//
router.post("/register", userCtrl.register);
router.get("/check-auth", userCtrl.refreshToken);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/info", auth, userCtrl.getUser);
router.get("/:userId", userCtrl.getUserInfo);

//
module.exports = router;

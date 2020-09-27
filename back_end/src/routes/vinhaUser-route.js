const vinhaUserController = require("../controllers/vinhaUser-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(),vinhaUserController.getConnection);
router.get("/vinhasFromUser/:id", authorize(),vinhaUserController.getVinhaFromUser);
router.get("/user/:id",authorize(),vinhaUserController.getUserFromConnection);
router.get("/vinha/:id",authorize(),vinhaUserController.getVinhaFromConnection);
router.get("/vinhaInfo/:id",authorize(),vinhaUserController.getVinhaInfoFromUsers);
router.get("/vinha/user/:id",authorize(),vinhaUserController.getUsersFromVinha);
router.post("", vinhaUserController.addConnection);
router.delete("/delete",authorize(),vinhaUserController.deleteConnection);

module.exports = router;
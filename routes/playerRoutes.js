const express = require("express");
const router = express.Router();
const controller = require("../controllers/playerControllers");

router.get("/players", controller.getPlayers);
router.get("/players/:id/description", controller.getPlayerDescription);
router.post("/players", controller.createPlayer);
router.patch("/players/:id", controller.updatePlayer);
router.delete("/players/:id", controller.deletePlayer);

module.exports = router;

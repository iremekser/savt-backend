const router = require('express').Router();
// controllers
const roomTypeController = require('../controllers/roomTypeController');

router.get("/", roomTypeController.list);
router.get("/:id", roomTypeController.find);
router.post("/", roomTypeController.create);
router.put("/:id", roomTypeController.update);
router.delete("/:id", roomTypeController.delete);

module.exports = router;

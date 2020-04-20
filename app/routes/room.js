const router = require('express').Router();
// controllers
const roomController = require('../controllers/roomController');

router.get("/", roomController.list);
router.get("/:id", roomController.find);
router.post("/", roomController.create);
router.put("/:id", roomController.update);
router.delete("/:id", roomController.delete);

module.exports = router;

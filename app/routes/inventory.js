const router = require('express').Router();
// controllers
const inventoryController = require('../controllers/inventoryController');

router.get("/", inventoryController.list);
router.get("/:id", inventoryController.find);
router.post("/", inventoryController.create);
router.put("/:id", inventoryController.update);
router.delete("/:id", inventoryController.delete);

module.exports = router;

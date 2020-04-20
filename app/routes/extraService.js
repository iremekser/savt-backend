const router = require('express').Router();
// controllers
const extraServiceController = require('../controllers/extraServiceController');

router.get("/", extraServiceController.list);
router.get("/:id", extraServiceController.find);
router.post("/", extraServiceController.create);
router.put("/:id", extraServiceController.update);
router.delete("/:id", extraServiceController.delete);

module.exports = router;

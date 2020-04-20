const router = require('express').Router();
// controllers
const customerController = require('../controllers/customerController');

router.get("/", customerController.list);
router.get("/:id", customerController.find);
router.post("/", customerController.create);
router.put("/:id", customerController.update);
router.delete("/:id", customerController.delete);

module.exports = router;

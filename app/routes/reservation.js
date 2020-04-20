const router = require('express').Router();
// controllers
const reservationController = require('../controllers/reservationController');

router.get("/", reservationController.list);
router.get("/:id", reservationController.find);
router.post("/", reservationController.create);
router.put("/:id", reservationController.update);
router.delete("/:id", reservationController.delete);

module.exports = router;
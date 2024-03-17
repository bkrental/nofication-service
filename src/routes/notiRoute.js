const router = require('express').Router();
const notificationController = require('../controllers/notiController');

router.post('/', notificationController.sendNoti);

module.exports = router;
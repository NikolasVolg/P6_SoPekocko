const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");

const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // fenêtre de 15 minutes
    max: 20, // 20 requêtes max par fenêtre
});


// router sauces
router.post('/', apiLimiter, auth, multer, sauceCtrl.createSauce);
router.get('/', apiLimiter, auth, sauceCtrl.getAllSauce);
router.get('/:id', apiLimiter, auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', apiLimiter, auth, sauceCtrl.deleteSauce);

//router like
router.post('/:id/like', apiLimiter, auth, sauceCtrl.likeSauce);

module.exports = router;
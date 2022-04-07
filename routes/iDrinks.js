const express = require('express');
const router = express.Router();
const iDrinks = require('../controllers/iDrinksCtrls');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateIDrink } = require('../middleware');
const multer = require('multer');
const { storage } = require('../configs/cloudinarySetup');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(iDrinks.index))
    .post(isLoggedIn, upload.array('image'), validateIDrink, catchAsync(iDrinks.createIDrink));


router.get('/new', isLoggedIn, iDrinks.renderNewForm);

router.route('/:id')
    .get(catchAsync(iDrinks.showIDrink))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateIDrink, catchAsync(iDrinks.updateIDrink))
    .delete(isLoggedIn, isAuthor, catchAsync(iDrinks.deleteIDrink));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(iDrinks.renderEditForm));

module.exports = router;
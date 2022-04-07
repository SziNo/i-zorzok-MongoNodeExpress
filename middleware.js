const { iDrinkSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const IDrink = require('./models/iDrink');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'Be kell jelentkezned ehhez!');
    return res.redirect('/login');
  }
  next();
};

module.exports.validateIDrink = (req, res, next) => {
  const { error } = iDrinkSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const iDrink = await IDrink.findById(id);
  if (!req.user.isAdmin && !iDrink.author.equals(req.user._id)) {
    req.flash('error', 'Nincs engedélyed ehhez!');
    return res.redirect(`/iDrinks/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!req.user.isAdmin && !review.author.equals(req.user._id)) {
    req.flash('error', 'Nincs engedélyed ehhez!');
    return res.redirect(`/iDrinks/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

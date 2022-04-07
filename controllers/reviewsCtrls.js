const IDrink = require('../models/iDrink');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
  const iDrink = await IDrink.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  iDrink.reviews.push(review);
  await review.save();
  await iDrink.save();
  req.flash('success', 'Értékelésed sikeresen létrehoztad!');
  res.redirect(`/iDrinks/${iDrink._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await IDrink.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Értékelésed sikeresen törölted!');
  res.redirect(`/iDrinks/${id}`);
};

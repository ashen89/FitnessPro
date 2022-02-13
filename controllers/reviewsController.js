const Review = require("../models/review");
const Gymground = require("../models/gymground");

module.exports.create = async (req, res, next) => {
    const { id } = req.params;
    const gymground = await Gymground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user;
    gymground.reviews.push(review);
    await gymground.save();
    await review.save();
    req.flash("success", "Created new review!");
    res.redirect(`/gymgrounds/${id}`);
};

module.exports.delete = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Gymground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/gymgrounds/${id}`);
};

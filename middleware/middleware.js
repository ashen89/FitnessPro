const ExpressError = require("../utils/ExpressError");
const Gymground = require("../models/gymground");
const Review = require("../models/review");
const { gymgroundSchema, reviewSchema } = require("../schemas");

module.exports.validateGymground = (req, res, next) => {
    const { error } = gymgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((er) => {
            return er.message;
        });
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((er) => {
            return er.message;
        });
        throw new ExpressError(msg, 404);
    } else {
        next();
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in!");
        return res.redirect("/login");
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const gymground = await Gymground.findById(id);
    if (!gymground.author.equals(req.user._id)) {
        req.flash("error", "You dont have permisison for this page!");
        return res.redirect(`/gymgrounds/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You dont have permission to do that");
        return res.redirect(`/gymgrounds/${id}`);
    }
    next();
};
const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const reviewController = require("../controllers/reviewsController");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware/middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(reviewController.create));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviewController.delete));

module.exports = router;

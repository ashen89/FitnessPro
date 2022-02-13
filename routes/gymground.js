const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const gymgroundsController = require("../controllers/gymgroundsController");
const { validateGymground, isLoggedIn, isAuthor, } = require("../middleware/middleware");
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

router.route("/")
    .get(catchAsync(gymgroundsController.index))
    .post(isLoggedIn, upload.array('image'), validateGymground, catchAsync(gymgroundsController.create));

router.get("/new", isLoggedIn, gymgroundsController.newForm);

router.route("/:id")
    .get(catchAsync(gymgroundsController.show))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateGymground, catchAsync(gymgroundsController.update))
    .delete(isLoggedIn, isAuthor, catchAsync(gymgroundsController.delete));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(gymgroundsController.editForm));



module.exports = router;

const express = require("express");

const router = express.Router();

const feedControllers = require("../controllers/feed");

router.get("/posts/:postId", feedControllers.showPost);

router.get("/about", feedControllers.getAbout);

router.get("/", feedControllers.getIndex);

module.exports = router;

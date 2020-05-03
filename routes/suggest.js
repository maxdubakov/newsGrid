const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();

const suggestController = require("../controllers/suggest");

router.get("/suggest", suggestController.getSuggest);
router.post(
  "/suggest",
  [
    body("email").isLength({ min: 1 }),

    body("title").isLength({ min: 3, max: 30 }),

    body("content").isLength({ min: 5 }),

    body("provider").isLength({ min: 1 }).isURL(),
  ],
  suggestController.postSuggest
);

module.exports = router;

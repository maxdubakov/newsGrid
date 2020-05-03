const mongoose = require("mongoose");
const { validationResult } = require("express-validator/check");

const Post = require("../models/post");

exports.getSuggest = (req, res, next) => {
  res.render("suggest", {
    title: "Suggest News",
    path: "/suggest",
  });
};

exports.postSuggest = async function (req, res, next) {
  const email = req.body.email;
  const title = req.body.title;
  const newsType = req.body.type;
  const content = req.body.content;
  const providerUrl = req.body.provider;
  const imageUrl = req.body.imageUrl;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid input!");
    console.log(errors);
    error.statusCode = 422;
    throw error;
  }

  const post = new Post({
    email: email,
    title: title,
    type: newsType,
    content: content,
    providerUrl: providerUrl,
    imageUrl: imageUrl,
  });

  await post.save();
  console.log(1);
  res.redirect('/');
};

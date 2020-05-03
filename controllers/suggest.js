const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getSuggest = (req, res, next) => {
  res.render('suggest', {
    title: 'Suggest News',
    path: '/suggest'
  });
};

exports.postSuggest = async function (req, res, next) {
  const email = req.body.email;
  const title = req.body.title;
  const newsType = req.body.type;
  const content = req.body.content;
  const providerUrl = req.body.provider;
  const image = req.file;

  if (!image) {
    return res.status(422).render('suggest', {
      title: 'Suggest News',
      path: '/suggest'
    });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Invalid input!');
    console.log(errors);
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = image.path;

  const post = new Post({
    email: email,
    title: title,
    type: newsType,
    content: content,
    providerUrl: providerUrl,
    imageUrl: imageUrl
  });

  await post.save();
  res.redirect('/');
};

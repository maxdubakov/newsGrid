const mongoose = require('mongoose');

const Post = require('../models/post');

exports.getIndex = async function (req, res, next) {
  const posts = await Post.find();
  res.render('index', {
    title: 'NewsGrid | Latest News',
    path: '/',
    posts: posts,
    size: posts.length,
  });
};

exports.getAbout = (req, res, next) => {
  res.render('about', {
    title: 'About | Latest News',
    path: '/about',
  });
};

exports.showPost = async function (req, res, next) {
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    const error = new Error('Post was not found!');
    error.statusCode = 404;
    throw error;
  }

  return res.render('article', {
    title: 'Article',
    path: '/post',
    post: post,
  });

};

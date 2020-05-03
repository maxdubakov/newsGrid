const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const MONGODB_URI = `mongodb+srv://maxim:Dubakov88@onlineshop-nephe.mongodb.net/newsGrid`;

const feedRoutes = require('./routes/feed');
const suggestRoutes = require('./routes/suggest');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('imageUrl'));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(feedRoutes);
app.use(suggestRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', {
    title: 'Error 404',
    path: '/error404'
  });
});

app.use((error, req, res, next) => {
  res.status(500)
    .render('500', {
      title: 'Error!',
      path: '/error500',
      errorMessage: error
    });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

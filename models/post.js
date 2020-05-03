const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  providerUrl: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);

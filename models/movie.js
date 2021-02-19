const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Некорректный URL'
    }
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Некорректный URL'
    }
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Некорректный URL'
    }
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  nameRU: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  nameEN: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  }
});

module.exports = mongoose.model('movie', movieSchema);
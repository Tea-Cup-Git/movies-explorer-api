const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getMovies, addMovie, deleteMovie
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);

moviesRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) {
        throw new Error('Неверно введенный URL');
      }
      return url;
    }),
    trailer: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) {
        throw new Error('Неверно введенный URL');
      }
      return url;
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) {
        throw new Error('Неверно введенный URL');
      }
      return url;
    })
  })
}), addMovie);

moviesRouter.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex()
  })
}), deleteMovie);

module.exports = moviesRouter;
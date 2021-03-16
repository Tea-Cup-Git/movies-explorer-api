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
    movieId: Joi.number().required(),
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

moviesRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required()
  })
}), deleteMovie);

module.exports = moviesRouter;
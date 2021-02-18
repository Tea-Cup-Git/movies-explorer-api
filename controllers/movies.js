const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      res.send(movie);
    })
    .catch((err) => {
      if (err) {
        next(new BadRequestError(`${err}`));
      } else next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Данные не найдены');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      Movie.findByIdAndRemove(req.params._id)
        .then((deletedMovie) => res.send(deletedMovie));
    })
    .catch(next);
};
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const moviesRouter = require('./movies.js');
const usersRouter = require('./users.js');
const auth = require('../middlewares/auth.js');
const { login, createUser } = require('../controllers/users.js');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().trim().required().min(6),
    name: Joi.string().required().min(2).max(30)
  })
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
  })
}), login);

router.use(auth);

router.use('/', auth, usersRouter);
router.use('/', auth, moviesRouter);

router.all('/*', (req, res, next) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, updateProfile, signOut
} = require('../controllers/users');

usersRouter.get('/users/me', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex()
  })
}), getUser);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30)
  })
}), updateProfile);

usersRouter.get('/signout', signOut);

module.exports = usersRouter;
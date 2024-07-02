const express = require('express');
const router = require('express').Router();
const { createUser, findUser } = require('@services/users');
const { routerError } = require('@services/error');
const { validateUserData } = require('@middleware/validation');

router.post('/register', express.urlencoded({ extended: true }), validateUserData, createUser, (req, res) => {
  res.redirect('/');
});

router.post('/login', express.urlencoded({ extended: true }), findUser, (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.use(routerError);

module.exports = {
  router,
};

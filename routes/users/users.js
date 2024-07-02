const { deleteUser } = require('@services/users');
const { routerError } = require('@services/error');

const express = require('express');
const router = require('express').Router();

router.post('/delete', express.urlencoded({ extended: true }), deleteUser, (req, res) => {
  res.redirect('/admin');
});

router.use(routerError);

module.exports = {
  router,
};

const express = require('express');
const cors = require('cors');

const customResponse = require('./express-response');
const config = require('../config/config');

const { cartRoutes } = require('../src/Cart');
const { couponRoutes } = require('../src/Coupons');

const prefix = '/api/v1';

/**
 * Load app and mount endpoints
 * @param {express.Express} app
 */
module.exports = function mountApp(app) {
  app.response = Object.create(customResponse);

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.on('error', (err) => {
    console.log(err);
  });

  app.get(`${prefix}`, (_req, res) =>
    res.json({
      status: true,
      message: '***SCELLOO APIs RUNNING***',
    })
  );

  app.use(`${prefix}/carts`, cartRoutes);

  app.use(`${prefix}/coupons`, couponRoutes);

  app.use((err, _req, res, _next) => {
    if (err.type && err.type === 'entity.parse.failed') {
      res.status(400).errorMessage('Invalid JSON payload passed.');
    } else if (err.toString() === '[object Object]') {
      try {
        res.status(400).error(err);
      } catch {
        res.status(500).errorMessage('Server error');
      }
    } else {
      res.status(400).errorMessage(err.toString());
    }
  });
};

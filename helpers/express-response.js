const express = require('express');

const customResponse = Object.create(express().response, {
  data: {
    value(data, status = true) {
      return this.type('json').json({
        status,
        data,
      });
    },
  },
  error: {
    value(error, message = 'An error occured', additionalInfo = undefined) {
      return this.json({
        message,
        statusCode: -3,
        status: false,
        error,
        info: additionalInfo && {
          ...additionalInfo,
        },
      });
    },
  },
  errorMessage: {
    value(message = 'API response message', additionalInfo = undefined) {
      return this.json({
        message,
        status: false,
        statusCode: 1,
        info: additionalInfo && {
          ...additionalInfo,
        },
      });
    },
  },
});

module.exports = customResponse;

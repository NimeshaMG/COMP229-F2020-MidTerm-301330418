/*File Name index.js
Name:Nimesha Mathale Ralalage
Student ID:301330418
Date:7 July 2023*/



// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;

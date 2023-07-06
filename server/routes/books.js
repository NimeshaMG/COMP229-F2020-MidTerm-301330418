/*File Name books.js
Name:Nimesha Mathale Ralalage
Student ID:301330418
Date:7 July 2023*/




// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    
      res.render('books/details', {
        title: "Add",
        page:'details',
        book:''
      });
     
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let books=book({
      "Title":req.body.Title,
      "Description":req.body.Description,
      "Price":req.body.Price,
      "Author":req.body.Author,
      "Genre":req.body.Genre,
      
    });

    book.create(books,(err,book) => {
      if(err){
        console.log(err);
        res.end(err);
      }
      res.redirect('/books')
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    
      book.findById(req.params.id, (err, book) => {
        if(err){
          return console.error(err);
        }else{
          res.render('books/details',{title:'Edit',page:'details',book:book});
        }
        });
      });
    

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
  let updatedBook = {
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
  };

  book.findByIdAndUpdate(id, updatedBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/book');
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    
      let id = req.params.id;
      book.remove({_id: id}, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } 
          res.redirect('/books');
        
      });
    });



module.exports = router;

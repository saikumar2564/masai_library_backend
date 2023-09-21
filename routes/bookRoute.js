const express = require("express");
const {
  bookRegistration,
  booksData,
  updateBook,
  deleteBook,
  singleBooksData,
} = require("../controllers/book.controllers");

const bookRouter = express.Router();

bookRouter.get("/", booksData);
bookRouter.get("/:id", singleBooksData);
bookRouter.post("/add", bookRegistration);
bookRouter.patch("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

module.exports = { bookRouter };

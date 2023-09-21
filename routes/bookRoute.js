const express = require("express");
const {
  bookRegistration,
  booksData,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers");

const bookRouter = express.Router();

bookRouter.get("/", booksData);
bookRouter.get("/:id", booksData);
bookRouter.post("/", bookRegistration);
bookRouter.patch("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

module.exports = { bookRouter };

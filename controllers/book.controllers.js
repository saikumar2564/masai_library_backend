const { bookModel } = require("../model/bookModel");

const booksData = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).send({ message: "All Books Fetched", books });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const singleBooksData = async (req, res) => {
  const bookId = req.params.id;
  try {
    const oneBook = await bookModel.findById(bookId);
    res.status(200).send({ message: "Single Book", oneBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const bookRegistration = async (req, res) => {
  const payload = req.body;
  try {
    const newBook = new bookModel(payload);
    await newBook.save();
    res.status(200).send({ message: "Book Added", newBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const payload = req.body;
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(bookId, payload, {
      new: true,
    });
    res.status(204).send({ message: "Book Updated", updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const deleteBook = await bookModel.findByIdAndDelete(bookId);
    res.status(204).send({ message: "Book Deleted", deleteBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

module.exports = {
  booksData,
  singleBooksData,
  bookRegistration,
  updateBook,
  deleteBook,
};

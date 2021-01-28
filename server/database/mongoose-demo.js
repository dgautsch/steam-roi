require('regenerator-runtime/runtime')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../config/.env') })
const logger = require('debug')('mongoose:demo')
const { connectDefaultDb } = require('./index')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

async function init () {
  try {
    // Connect Mongo Database
    await connectDefaultDb()
    logger('Established default DB connection')
    await cleanData()
    await createLibrary()
  } catch (error) {
    logger(error)
    throw new Error(error.message)
  }
}

// #region Schemas

// Create a Book Schema
const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },
    summary: {
      type: String
    },
    ISBN: {
      type: String,
      index: true
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: 'Genre',
      required: true
    },
    url: {
      type: String
    }
  },
  { timestamps: true }
)

// Create an Author Schema
const AuthorSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
})
// https://mongoosejs.com/docs/guide.html#indexes
AuthorSchema.index({ first_name: 1, last_name: 1 }, { unique: true })

// Create a Genre Schema
const GenreSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
})

// #endregion

// #region Models
const BookModel = mongoose.model('Book', BookSchema)
const AuthorModel = mongoose.model('Author', AuthorSchema)
const GenreModel = mongoose.model('Genre', GenreSchema)
// #endregion

// #region Storing Records
async function createAuthor (data) {
  // Create an Author
  try {
    const author = new AuthorModel(data)
    return await author.save()
  } catch (error) {
    throw new Error(error)
  }
}

async function createGenre (data) {
  // Create a Genre
  try {
    const genre = new GenreModel(data)
    return await genre.save()
  } catch (error) {
    throw new Error(error)
  }
}

async function createBook (data) {
  // Create a Book
  try {
    // Save the new book
    const book = new BookModel(data)
    await book.save()

    // Find the author and add the book
    const author = await AuthorModel.findById({ _id: book.author })
    author.books.push(book)
    return await author.save()
  } catch (error) {
    throw new Error(error)
  }
}

async function createLibrary () {
  // Create Authors
  const george = await createAuthor({
    first_name: 'George',
    last_name: 'Costanza'
  })

  // Create Genres
  const genres = [
    await createGenre({ name: 'History' }),
    await createGenre({ name: 'Comedy' }),
    await createGenre({ name: 'Fiction' })
  ]

  // Create Books
  await createBook({
    title: "George's Guide to Parents",
    author: george._id,
    summary:
      'Listen carefully. My mother has never laughed. Ever. Not a giggle, not a chuckle, not a tee-hee…never went Ha!',
    ISBN: 'A123X-2132',
    genre: genres[0]._id,
    url: 'http://www.seinfeld.com'
  })

  await createBook({
    title: "George's Guide to Eating Shrimp",
    author: george._id,
    summary:
      'The Sea Was Angry That Day, My Friends! Like An Old Man Trying To Send Back Soup In A Deli!',
    ISBN: 'A123X-2133',
    genre: genres[1]._id,
    url: 'http://www.seinfeld.com'
  })

  await createBook({
    title: "George's Guide to Lunch",
    author: george._id,
    summary:
      'Lunch is fine at the beginning, then you move on to dinner. You don’t move back to lunch. It’s like being demoted.',
    ISBN: 'A123X-2134',
    genre: genres[1]._id,
    url: 'http://www.seinfeld.com'
  })

  await createBook({
    title: "George's Guide to Life",
    author: george._id,
    summary: 'Just remember, it’s not a lie if you believe it.',
    ISBN: 'A123X-2135',
    genre: genres[1]._id,
    url: 'http://www.seinfeld.com'
  })
  logData()
}

// #endregion

// #region Querying Records
function logData () {
  AuthorModel.findOne({ first_name: 'George' }, function (err, george) {
    if (err) {
      throw err
    }
    logger(george)
  })
  BookModel.findOne({ title: "George's Guide to Life" }, function (err, book) {
    if (err) {
      throw err
    }
    logger(book)
  })
}

async function cleanData () {
  await AuthorModel.deleteMany({})
  await BookModel.deleteMany({})
  await GenreModel.deleteMany({})
}
// #endregion
exports.default = init
exports.cleanData = cleanData

init()

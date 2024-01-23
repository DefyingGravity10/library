let currentId = 10000000;
const myLibrary = [];

// Constructor function for Book object
function Book(title, author, numberOfPages, haveRead) {
  // Used to assign properties to the object's properties
  this.BookId = updateCurrentId();
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;

  // A method that reveals the information of the book
  this.revealInfo = function () {
    return `${this.BookId}, ${title}, ${author}, ${numberOfPages}, ${haveRead}`;
  };
}

function addBookToLibrary(title, author, numberOfPages, haveRead) {
  newBook = new Book(title, author, numberOfPages, haveRead);
  myLibrary.push(newBook);
}

function updateCurrentId() {
  return ++currentId;
}

function displayBooks() {
  myLibrary.forEach((e) => {
    console.log(e.revealInfo());
  });
}

// Sample books
addBookToLibrary(`Book Title`, `Me`, `199`, `have not read`);
addBookToLibrary(`HAHAHAHA`, `Me again`, `9`, `have read`);
displayBooks();

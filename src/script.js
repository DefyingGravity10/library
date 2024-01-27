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
}

// Functions

function addBookToLibrary(title, author, numberOfPages, haveRead) {
  // To add: functionality
  newBook = new Book(title, author, numberOfPages, haveRead);
  myLibrary.push(newBook);
}

function updateCurrentId() {
  return ++currentId;
}

function displayBooks() {
  const table = document.getElementsByTagName("table")[0];

  myLibrary.forEach((e) => {
    const row = table.insertRow();
    let text;

    for (let i = 0; i < 4; ++i) {
      switch (i) {
        case 0:
          text = document.createTextNode(`${e.title}`);
          break;
        case 1:
          text = document.createTextNode(`${e.author}`);
          break;
        case 2:
          text = document.createTextNode(`${e.numberOfPages}`);
          break;
        case 3:
          text = document.createTextNode(`${e.haveRead}`);
          break;
        default:
          text = document.createTextNode(``);
      }
      const cell = row.insertCell(i);
      cell.appendChild(text);
    }
  });
}

// Sample books
addBookToLibrary(`Book Title`, `Me`, `199`, `have not read`);
addBookToLibrary(`HAHAHAHA`, `Me again`, `9`, `have read`);
displayBooks();

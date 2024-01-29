let currentId = 10000000;
let myLibrary = [];

// Constructor function for Book object
function Book(title, author, numberOfPages, haveRead) {
  // Used to assign properties to the object's properties
  this.bookId = updateCurrentId();
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

    for (let i = 0; i < 5; ++i) {
      const cell = row.insertCell(i);
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
        case 4:
          const button = document.createElement("div");
          button.classList.add("delete-button");
          button.onclick = function () {
            const row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
            myLibrary = myLibrary.filter((item) => item.bookId !== e.bookId);
            console.log(myLibrary);
          };
          cell.appendChild(button);
          continue;
        default:
          text = document.createTextNode(``);
          break;
      }
      cell.appendChild(text);
    }
  });
}

// Sample books
addBookToLibrary(`Book Title`, `Me`, `199`, `have not read`);
addBookToLibrary(`HAHAHAHA`, `Me again`, `9`, `have read`);
addBookToLibrary(`a`, `Me again`, `29`, `have read`);
displayBooks();

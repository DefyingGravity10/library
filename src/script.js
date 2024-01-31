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

/* Functions */

function addBookToLibrary(title, author, numberOfPages, haveRead) {
  newBook = new Book(title, author, numberOfPages, haveRead);
  myLibrary.push(newBook);
}

// Helper function (possibly for back-end purposes)
function updateCurrentId() {
  return ++currentId;
}

function displayStoredBooks() {
  if (myLibrary.length === 0) {
    emptyLibrary();
  } else {
    const table = document.getElementsByTagName("table")[0];
    myLibrary.forEach((e) => {
      const row = table.insertRow();
      let text;

      row.classList.add("book-entry");

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
              if (myLibrary.length === 0) {
                emptyLibrary();
              }
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
}

function emptyLibrary() {
  const empty = document.getElementById("content");

  if (empty.querySelector(".empty") !== null) {
    empty.querySelector(".empty").remove();
  }

  const div = document.createElement("div");
  const text = document.createTextNode(
    "There are currently no books in the library.",
  );
  div.classList.add("empty");
  div.appendChild(text);
  empty.appendChild(div);
}

function updateLibrary() {
  const table = document.getElementsByTagName("table")[0];
  const row = table.insertRow();
  const newBook = myLibrary[myLibrary.length - 1];
  let text;

  row.classList.add("book-entry");

  const empty = document.getElementById("content");

  if (empty.querySelector(".empty") !== null) {
    empty.querySelector(".empty").remove();
  }

  for (let i = 0; i < 5; ++i) {
    const cell = row.insertCell(i);
    switch (i) {
      case 0:
        text = document.createTextNode(`${newBook.title}`);
        break;
      case 1:
        text = document.createTextNode(`${newBook.author}`);
        break;
      case 2:
        text = document.createTextNode(`${newBook.numberOfPages}`);
        break;
      case 3:
        text = document.createTextNode(`${newBook.haveRead}`);
        break;
      case 4:
        const button = document.createElement("div");
        button.classList.add("delete-button");
        button.onclick = function () {
          const row = button.parentNode.parentNode;
          row.parentNode.removeChild(row);
          myLibrary = myLibrary.filter(
            (item) => item.bookId !== newBook.bookId,
          );
          if (myLibrary.length === 0) {
            emptyLibrary();
          }
        };
        cell.appendChild(button);
        continue;
      default:
        text = document.createTextNode(``);
        break;
    }
    cell.appendChild(text);
  }
}

// Sample books
addBookToLibrary(`Book Title`, `Me`, `199`, `have not read`);
//addBookToLibrary(`HAHAHAHA`, `Me again`, `9`, `have read`);
//addBookToLibrary(`a`, `Me again`, `29`, `have read`);
displayStoredBooks();

function getNewBook() {}
const newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click", openPopUp);

const popUp = document.getElementById("pop-up");
const submitButton = document.getElementById("submit");
const closeBtn = document.getElementById("close-pop-up");
const readStatus = document.getElementById("status");

// Function to show the popUp
function openPopUp() {
  popUp.classList.remove("hidden");
}

// Function to hide the popUp
function closePopUp() {
  popUp.classList.add("hidden");
}

function random() {
  addBookToLibrary(`HAHAHAHA`, `Me again`, `9`, `have read`);
  updateLibrary();
}

function toggleStatus() {
  readStatus.classList.toggle("unread");

  if (readStatus.value === "Read") {
    readStatus.value = "Not read";
  } else {
    readStatus.value = "Read";
  }
}

// Event listener to close the popUp
closeBtn.addEventListener("click", closePopUp);
submitButton.addEventListener("click", random);
readStatus.addEventListener("click", toggleStatus);

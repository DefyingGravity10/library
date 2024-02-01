let currentId = 10000000;
let myLibrary = [];

/* Constructor function for Book object */
function Book(title, author, numberOfPages, haveRead) {
  // Used to assign properties to the object's properties
  this.bookId = updateCurrentId();
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;
}

function updateCurrentId() {
  return ++currentId;
}

/* Event Listeners and their corresponding functions */

// Activates button that allows users to add a new book to the library
const newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click", openPopUp);

// Opens pop-up whenever the "New Book" button is pressed
const popUp = document.getElementById("pop-up");

function openPopUp() {
  popUp.classList.remove("hidden");
}

// Updates the status of the book (e.g. read or not read)
const readStatus = document.getElementById("status");
readStatus.addEventListener("click", toggleStatus);

function toggleStatus() {
  // Function that updates the value of the button
  readStatus.classList.toggle("unread");

  if (readStatus.value === "Read") {
    readStatus.value = "Not read";
  } else {
    readStatus.value = "Read";
  }
}

// Submits new book entry
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submitNewBook);

function submitNewBook() {
  // Function that performs form vallidation and adds book to library
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const numberOfPages = document.getElementById("numberOfPages");
  const status = document.getElementById("status");

  // Form validation
  if (!title.value || !author.value || !numberOfPages.value) {
    title.classList.add("empty");
    author.classList.add("empty");
    numberOfPages.classList.add("empty");
    alert("Please fill out all the fields.");
    return;
  }

  addBookToLibrary(
    title.value,
    author.value,
    numberOfPages.value,
    status.value,
  );
  updateLibraryDisplay();
  clearValues(title, author, numberOfPages);
  closePopUp();
}

function addBookToLibrary(title, author, numberOfPages, haveRead) {
  // Function that adds a new book to the library
  newBook = new Book(title, author, numberOfPages, haveRead);
  myLibrary.push(newBook);
}

function updateLibraryDisplay() {
  // Function that displays the updated books in the library

  // Get the table, add a row and prepare to add the newly added book
  const table = document.getElementsByTagName("table")[0];
  const row = table.insertRow();
  const newBook = myLibrary[myLibrary.length - 1];
  let text;
  row.classList.add("book-entry"); // Class made for CSS hover
  row.setAttribute("id", `${newBook.bookId}`);

  // Remove the message indicating that library is empty
  const empty = document.getElementById("content");
  if (empty.querySelector(".empty") !== null) {
    empty.querySelector(".empty").remove();
  }

  // Add new cells that display the attributes of the book
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
        const statusButton = document.createElement("button");
        statusButton.classList.add("status");
        statusButton.textContent = `${newBook.haveRead}`;
        statusButton.onclick = function () {
          // Function that updates the value of the button
          statusButton.classList.toggle("unread");
          const index = myLibrary.findIndex(
            (book) =>
              book.bookId === Number(statusButton.parentNode.parentNode.id),
          );

          if (statusButton.textContent === "Read") {
            statusButton.textContent = "Not read";
            myLibrary[index].haveRead = "Not read";
          } else {
            statusButton.textContent = "Read";
            myLibrary[index].haveRead = "Read";
          }
        };
        cell.appendChild(statusButton);
        continue;
      case 4:
        const button = document.createElement("div");
        button.classList.add("delete-button");
        button.onclick = function () {
          // Function that deletes the book from the library and updates the display
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

function clearValues(title, author, numberOfPages) {
  // Function that clears the forms after a book is submitted
  title.value = "";
  author.value = "";
  numberOfPages.value = "";

  title.classList.remove("empty");
  author.classList.remove("empty");
  numberOfPages.classList.remove("empty");
}

// Closes the pop-up
const closeButton = document.getElementById("close-pop-up");
closeButton.addEventListener("click", closePopUp);

function closePopUp() {
  // Function that closes the pop-up and resets the form to its original state
  popUp.classList.add("hidden");
}

/* Functions without event listeners attached to them */

function displayStoredBooks() {
  // Function that displays stored books (if applicable)

  // Checks if library is empty and displays a message if such were the case
  if (myLibrary.length === 0) {
    emptyLibrary();
    return;
  }

  const table = document.getElementsByTagName("table")[0];
  myLibrary.forEach((e) => {
    const row = table.insertRow();
    row.setAttribute("id", `${e.bookId}`);
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
          const statusButton = document.createElement("button");
          statusButton.classList.add("status");
          statusButton.textContent = `${e.haveRead}`;
          statusButton.onclick = function () {
            // Function that updates the value of the button
            statusButton.classList.toggle("unread");
            const index = myLibrary.findIndex(
              (book) =>
                book.bookId === Number(statusButton.parentNode.parentNode.id),
            );
            if (statusButton.textContent === "Read") {
              statusButton.textContent = "Not read";
              myLibrary[index].haveRead = "Not read";
            } else {
              statusButton.textContent = "Read";
              myLibrary[index].haveRead = "Read";
            }
          };
          cell.appendChild(statusButton);
          continue;
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

function emptyLibrary() {
  // Function that handles an empty library
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

// Calls the displayStoredBooks function to display initial state of the library
displayStoredBooks();

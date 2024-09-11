function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const myLibrary = [];

const addBookDialog = document.getElementById("add-book-dialog");
const openAddDialogButton = document.getElementById("open-add-dialog-button");
const closeDialogButton = document.getElementById("close-dialog-button");
const form = document.getElementById("book-form");
const addBookButton = document.getElementById("add-book-button");
// site where appear cards
const bookGrid = document.getElementById("book-grid");

// open Add book Dialog
openAddDialogButton.addEventListener('click', openAddBookDialog);
function openAddBookDialog() {
    addBookDialog.showModal();
}
// close Add book Dialog
closeDialogButton.addEventListener('click', closeAddBookDialog);
function closeAddBookDialog(event) {
    event.preventDefault();
    addBookDialog.close();
    form.reset();
}
addBookButton.addEventListener('click', handleAddBook);
function handleAddBook(event) {
    event.preventDefault();
    if(form.checkValidity()) {
        const book = new Book(
            form.elements["book-title"].value,
            form.elements["book-author"].value,
            form.elements["book-pages"].value,
            form.elements["book-read"].checked
        );
        addBookDialog.close();
        addBookToLibrary(book);
        form.reset();
    }
    else {
        form.reportValidity();
    }
} 
function addBookToLibrary(book) {
    myLibrary.push(book);
    const newBookCard = createBookCard(book);
    bookGrid.append(newBookCard);
}

function createBookCard(book) {
    const bookCard = document.createElement("div")
    bookCard.className = "book-card";
    bookCard.setAttribute("position", String(myLibrary.length - 1));

    const titleDisplay = document.createElement("div");
    const authorDisplay = document.createElement("div");
    const pagesDisplay = document.createElement("div");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("i");

    titleDisplay.className = "title";
    authorDisplay.className = "author";
    pagesDisplay.className = "pages";
    removeButton.className = "material-icons";

    titleDisplay.innerText = book.title;
    authorDisplay.innerText = book.author;
    pagesDisplay.innerText = book.pages + " Pages";
    removeButton.innerText = "delete";

    if (book.read) {
        readButton.setAttribute("read", "true")
        readButton.innerText = "Read";
    }
    else {
        readButton.setAttribute("read", "false")
        readButton.innerText = "Unread";
    }
    readButton.addEventListener('click', () => {
        toggleReadStatus(book);
    });
    removeButton.addEventListener('click', () => {
        deleteBook(book);
    });

    titleDisplay.style.overflowWrap = "break-word";
    titleDisplay.style.textAlign = "center";
    authorDisplay.style.overflowWrap = "break-word";
    authorDisplay.style.textAlign = "center";

    bookCard.append(titleDisplay, authorDisplay, pagesDisplay, readButton, removeButton);
    return bookCard;
}

function deleteBook(bookToDelete) {
    const index = myLibrary.indexOf(bookToDelete);
    const bookList = document.getElementsByClassName("book-card");
    bookList[index].parentNode.removeChild(bookList[index]);
    myLibrary.splice(index, 1);
    for (let i = index; i < myLibrary.length; i++) {
        bookList[i].setAttribute("position", String(Number(bookList[i].getAttribute("position"))- 1));
    }
}

function toggleReadStatus(bookToToggle) {
    bookToToggle.read = !bookToToggle.read;
    
    const index = myLibrary.indexOf(myLibrary.find(({title}) => title === bookToToggle.title));
    const readButton = document.querySelector('div[position="${index}"] button');

    if (bookToToggle.read) {
        readButton.setAttribute("read","true");
        readButton.innerText = "Read";
    }
    else {
        readButton.setAttribute("read","false");
        readButton.innerText = "Unread";
    }
}


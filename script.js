const myLibrary = [];
function Book(title, author, pages, comments, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.comments = comments;
    this.read = read;  
}
const addBookDialog = document.getElementById("add-book-dialog");
const openAddDialogButton = document.getElementById("open-add-dialog-button");
const closeDialogButton = document.getElementById("close-dialog-button");
const form = document.getElementById("book-form");
const addBookButton = document.getElementById("add-book-button");
const bookGrid = document.getElementById("book-grid");

addBookButton.addEventListener('click', handleAddBook);

function handleAddBook(event) {
    event.preventDefault();
    if(form.checkValidity()) {
        const book = new Book(
            form.elements["book-title"].value,
            form.elements["book-author"].value, 
            form.elements["book-pages"].value,
            form.elements["book-comments"].value, 
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
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.setAttribute("position", myLibrary.length - 1);
    const createElement = (type, className, text = "") => {
        const element = document.createElement(type);
        element.className = className;
        element.innerText = text;
        return element;
    };
    const titleDisplay = createElement("div", "title", book.title);
    const authorDisplay = createElement("div", "author", book.author);
    const pagesDisplay = createElement("div", "pages", `${book.pages} Pages`);
    const commentsDisplay = createElement("div", "comments", `Comments: ${book.comments}`);
    const readButton = createElement("button", "read-btn", book.read ? "Read" : "Unread");
    const removeButton = createElement("i", "delete", "X");

    readButton.setAttribute("read", book.read ? "true" : "false");

    readButton.addEventListener('click', () => {
        toggleReadStatus(myLibrary.indexOf(book));
    });
    removeButton.addEventListener('click', () => {
        deleteBook(book);
    });

    bookCard.append(removeButton, titleDisplay, authorDisplay, pagesDisplay, commentsDisplay, readButton);
    return bookCard;
}

function deleteBook(bookToDelete) {
    const index = myLibrary.indexOf(bookToDelete);
    const bookList = document.getElementsByClassName("book-card");
    if (index > -1) {
        bookList[index].remove(); 
        myLibrary.splice(index, 1);
        for (let i = index; i < bookList.length; i++) {
            bookList[i].setAttribute("position", i);
        }
    }
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    const readButton = document.querySelector(`div[position="${index}"] button`);
    if (myLibrary[index].read) {              
        readButton.setAttribute("read", "true");
        readButton.innerText = "Read";
    } else {
        readButton.setAttribute("read", "false");
        readButton.innerText = "Unread";
    }
}

openAddDialogButton.addEventListener('click', () => addBookDialog.showModal());
closeDialogButton.addEventListener('click', (event) => {
    event.preventDefault();
    addBookDialog.close();
    form.reset();
});

addBookToLibrary(new Book("The Great Adventure", "John Doe", 350, "Great literary work to read in a weekend.", true));
addBookToLibrary(new Book("Mystery of the Night", "Jane Smith", 220, "Interesting categorical outcome", false));
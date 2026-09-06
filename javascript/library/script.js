// ========================================
// LIBRARY DATA
// ========================================

const myLibrary=[]

const booksGrid = document.querySelector("#books-grid")

const newBookButton = document.querySelector("#new-book-button")
const bookDialog = document.querySelector("#book-dialog")
const closeDialogButton = document.querySelector("#close-dialog-button")
const bookForm = document.querySelector("#book-form")


// Book constructor

function Book(title,author,pages,read){
    this.title=title
    this.auther=author
    this.pages=pages
    this.read=read
    this.id=crypto.randomUUID()
}

function addBookToLibrary(title,author,pages,read)
{
    const book=new Book(title,author,pages,read)
    myLibrary.push(book)
}

function displayBooks() {
    booksGrid.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("article");

        bookCard.classList.add("book-card");

        bookCard.dataset.bookId = book.id;

        bookCard.innerHTML = `
            <div class="book-cover">
                <img src="assets/book-cover-placeholder.jpg" alt="">
            </div>

            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>

                <p class="book-author">
                    by ${book.author}
                </p>

                <div class="book-meta">
                    <span class="book-pages">
                        ${book.pages} pages
                    </span>

                    <span class="book-status ${book.read ? "read" : "unread"}">
                        ${book.read ? "Read" : "Unread"}
                    </span>
                </div>

                <div class="book-actions">
                    <button class="book-toggle" type="button">
                        ${book.read ? "Mark as Unread" : "Mark as Read"}
                    </button>

                    <button class="book-remove" type="button">
                        Remove
                    </button>
                </div>
            </div>
        `;

        booksGrid.appendChild(bookCard);
    });
}

newBookButton.addEventListener("click",()=>{
    bookDialog.showModal()
})

closeDialogButton.addEventListener("click",()=>{
    bookDialog.close()
})


bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const pages = document.querySelector("#book-pages").value;

    const readStatus = document.querySelector(
        'input[name="read-status"]:checked'
    ).value;

    const read = readStatus === "read";

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    bookDialog.close();
    bookForm.reset();
});

booksGrid.addEventListener("click", (event) => {
    if (!event.target.classList.contains("book-remove")) {
        return;
    }

    const bookCard = event.target.closest(".book-card");
    const bookId = bookCard.dataset.bookId;

    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }
});
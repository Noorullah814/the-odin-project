// ========================================
// LIBRARY DATA
// ========================================

const myLibrary = []

const booksGrid = document.querySelector("#books-grid")

const newBookButton = document.querySelector("#new-book-button")
const bookDialog = document.querySelector("#book-dialog")
const closeDialogButton = document.querySelector("#close-dialog-button")
const bookForm = document.querySelector("#book-form")
const emptyState = document.querySelector("#empty-state")
const noResultsState = document.querySelector("#no-results-state")

const totalBooks = document.querySelector("#total-books")
const booksRead = document.querySelector("#books-read")
const booksReading = document.querySelector("#books-reading")
const booksUnread = document.querySelector("#books-unread")

const emptyAddBookButton = document.querySelector("#empty-add-book")
const searchInput = document.querySelector("#book-search")
const bookFilter = document.querySelector("#book-filter")

const cancelBookButton = document.querySelector(
    ".form-actions .close-dialog"
)


let searchTerm = "";
let filterStatus = "all";

// Book constructor

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = crypto.randomUUID()
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
}

function displayBooks() {

    booksGrid.innerHTML = "";
    if (myLibrary.length === 0) {
        booksGrid.style.display = "none";
        emptyState.style.display = "flex";
        noResultsState.style.display = "none";
        updateLibraryStats();
        return;
    }

    booksGrid.style.display = "grid";
    emptyState.style.display = "none";
    const filteredBooks = myLibrary.filter((book) => {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();

        const matchesSearch =
            title.includes(searchTerm) ||
            author.includes(searchTerm);

        const matchesFilter =
            filterStatus === "all" ||
            (filterStatus === "read" && book.read) ||
            (filterStatus === "unread" && !book.read);

        return matchesSearch && matchesFilter;
    });

    if (filteredBooks.length === 0) {
        booksGrid.style.display = "none";
        noResultsState.style.display = "flex";
        updateLibraryStats();
        return;
    }

    filteredBooks.forEach((book) => {
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
    updateLibraryStats();
}

function openBookDialog() {
    bookDialog.showModal();
}

newBookButton.addEventListener("click", openBookDialog);

closeDialogButton.addEventListener("click", () => {
    bookDialog.close()
})

emptyAddBookButton.addEventListener("click", openBookDialog);

cancelBookButton.addEventListener("click", () => {
    bookForm.reset();
    bookDialog.close();
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#book-title").value.trim();
    const author = document.querySelector("#book-author").value.trim();
    const pages = document.querySelector("#book-pages").value;

    const readStatus = document.querySelector(
        'input[name="read-status"]:checked'
    ).value;

    if (!title || !author || !pages) {
        return;
    }

    const pageCount = Number(pages);
    if (pageCount <= 0) {
        return;
    }

    const read = readStatus === "read";

    addBookToLibrary(title, author, pageCount, read);

    displayBooks();

    bookDialog.close();
    bookForm.reset();
});



booksGrid.addEventListener("click", (event) => {
    const bookCard = event.target.closest(".book-card");

    if (!bookCard) {
        return;
    }

    const bookId = bookCard.dataset.bookId;

    const book = myLibrary.find((book) => book.id === bookId);

    if (event.target.classList.contains("book-remove")) {
        const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
            displayBooks();
        }

        return;
    }

    if (event.target.classList.contains("book-toggle")) {
        book.toggleRead();
        displayBooks();
    }
});

function updateLibraryStats() {
    const total = myLibrary.length;

    const read = myLibrary.filter((book) => book.read).length;

    const unread = myLibrary.filter((book) => !book.read).length;

    const reading = 0;

    totalBooks.textContent = total;
    booksRead.textContent = read;
    booksReading.textContent = reading;
    booksUnread.textContent = unread;
}

searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.toLowerCase().trim();

    displayBooks();
});

bookFilter.addEventListener("change", () => {
    filterStatus = bookFilter.value;

    displayBooks();
});

bookDialog.addEventListener("click", (event) => {
    if (event.target === bookDialog) {
        bookDialog.close();
        bookForm.reset();
    }
});


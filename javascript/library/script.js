// ========================================
// LIBRARY DATA
// ========================================

const myLibrary=[]

const booksGrid = document.querySelector("#books-grid")

// Book constructor

function Book(title,auther,pages,read){
    this.title=title
    this.auther=auther
    this.pages=pages
    this.read=read
    this.id=crypto.randomUUID()
}

function addBookToLibrary(title,auther,pages,read)
{
    const book=new Book(title,auther,pages,read)
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


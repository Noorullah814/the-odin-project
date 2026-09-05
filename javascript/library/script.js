// ========================================
// LIBRARY DATA
// ========================================

const myLibrary=[]

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


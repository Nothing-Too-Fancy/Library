let myLibrary = [];

//DOM Objects
const _table = document.querySelector('.books');
const _tbody = document.querySelector('.lib-body');
const _editDelete = document.querySelector('.edit-delete');
const _new = document.querySelector('.new');

function Book(title, author, total, readPages, read) {
   this.title = title;
   this.author = author;
   this.totalPages = total;
   this.pagesRead = readPages;
   this.read = read;
}

let newBook = new Book(
   title = 'Harry Potter',
   author = 'JK Rowling',
   totalPages = 300,
   pagesRead = 35,
   read = false
   );
   
function addBookToLibrary(book) {
   let tr = document.createElement('tr');
   let tdTitle = document.createElement('td');
   let tdAuthor = document.createElement('td');
   let tdPages = document.createElement('td');
   let tdRead = document.createElement('td');

   tdTitle.textContent = book.title;
   tdAuthor.textContent = book.author;
   tdPages.textContent = `${book.pagesRead}/${book.totalPages}`;
   tdRead.textContent = book.read ? 'Read' : 'Not Read';

   tr.appendChild(tdTitle);
   tr.appendChild(tdAuthor);
   tr.appendChild(tdPages);
   tr.appendChild(tdRead);
   tr.appendChild(_editDelete.cloneNode(true));
   tr.appendChild(_new);

   _tbody.appendChild(tr);

   myLibrary.push(book);
}

addBookToLibrary(newBook);

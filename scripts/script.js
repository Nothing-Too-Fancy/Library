let myLibrary = [];

//DOM Objects
const _table = document.querySelector('.books');
const _tbody = document.querySelector('.lib-body');
const _form = document.querySelector('.form');
const _title = document.querySelector('.title');
const _author = document.querySelector('.author');
const _readPages = document.querySelector('.pages-read');
const _totalPages = document.querySelector('.total-pages');
const _status = document.querySelector('.status');
const _editDelete =
`<td class='edit-delete'>
   <button class='edit'>Edit</button>
   <button class='delete'>Delete</button>
</td>`;
const _new =
`<td class='new'>
   <button class='newbook'>+</button>
</td>`;

//Book object constructor
function Book(title, author, total, readPages, status) {
   this.title = title;
   this.author = author;
   this.totalPages = total;
   this.pagesRead = readPages;
   this.status = status;
}
   
function addBookToLibrary(book) {
   let tr = document.createElement('tr');
   let tdTitle = document.createElement('td');
   let tdAuthor = document.createElement('td');
   let tdPages = document.createElement('td');
   let tdStatus = document.createElement('td');

   tdTitle.textContent = book.title;
   tdAuthor.textContent = book.author;
   tdPages.textContent = `${book.pagesRead}/${book.totalPages}`;
   tdStatus.textContent = book.status ? 'Read' : 'Not Read';

   tr.appendChild(tdTitle);
   tr.appendChild(tdAuthor);
   tr.appendChild(tdPages);
   tr.appendChild(tdStatus);
   tr.appendChild(_editDelete.cloneNode(true));
   tr.appendChild(_new);

   _tbody.appendChild(tr);

   myLibrary.push(book);
}

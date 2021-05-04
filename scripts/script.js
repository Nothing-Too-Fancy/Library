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
const _submit = document.querySelector('.submit').addEventListener('click', 
   () => {
      let newBook = new Book(_title.value, _author.value, _totalPages.value, 
         _readPages.value, _status.value);

      addBookToLibrary(newBook);
});
const _cancel = document.querySelector('.cancel').addEventListener('click',
   () => {
      if (myLibrary.length != 0)
      {
         _form.remove();
      }

});
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
   this.totalPages = parseInt(total);
   this.pagesRead = parseInt(readPages);
   this.status = status;
}
   
function addBookToLibrary(book)
{
   if (book.title      === '' || 
       book.author     === '' ||
       isNaN(book.totalPages) ||
       isNaN(book.pagesRead))
   {

      alert("Please fill out all fields.");
      return;
   }
   else if (typeof book.totalPages != 'number' ||
            book.totalPages < 0 ||
            typeof book.pagesRead  != 'number' ||
            book.pagesRead < 0)
   {
      alert("Please enter a positive number for page numbers.");
      return;
   }
   else if (book.totalPages < book.pagesRead)
   {
      alert("Total pages cannot be less than pages read.");
      return;
   }

   myLibrary.push(book);
   render();
}

function render()
{
   _tbody.innerHTML = '';
   myLibrary.forEach((book) => {
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
      tr.insertAdjacentHTML('beforeend', _editDelete);
      tr.insertAdjacentHTML('beforeend', _new);

      _tbody.appendChild(tr);
   })
}
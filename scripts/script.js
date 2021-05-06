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
      if (validate() == 0)
      {
         if (_form.hasAttribute('data-index')) {
            let book = myLibrary[parseInt(_form.dataset.index)];
            book.title = _title.value;
            book.author = _author.value;
            book.pagesRead = parseInt(_readPages.value);
            book.totalPages = parseInt(_totalPages.value);
            book.status = _status.value;

            myLibrary[parseInt(_form.dataset.index)] = book;
            _form.removeAttribute('data-index');
            render();
         }
         else {
            let newBook = new Book(_title.value, _author.value, _totalPages.value, 
            _readPages.value, _status.value);

            addBookToLibrary(newBook);
         }
      }
   });

const _cancel = document.querySelector('.cancel').addEventListener('click',
   () => {
      if (myLibrary.length != 0)
      {
         _form.remove();
         render();
      }

});

function buildEditDelete() {
   let td = document.createElement('td');
   td.classList.add('edit-delete');
   let editButton = document.createElement('button');
   editButton.classList.add('edit');
   editButton.textContent = 'Edit';
   let deleteButton = document.createElement('button');
   deleteButton.classList.add('delete');
   deleteButton.textContent = 'Delete';

   td.appendChild(editButton);
   td.appendChild(deleteButton);

   return td;
}
const _editDelete = buildEditDelete();

function buildNew() {
   let td = document.createElement('td');
   td.classList.add('new');
   let editButton = document.createElement('button');
   editButton.classList.add('newbook');
   editButton.textContent = '+';

   td.appendChild(editButton);
   return td;
}

const _new = buildNew();

_new.addEventListener('click', () => {
   _title.value = '';
   _author.value = '';
   _readPages.value = '';
   _totalPages.value = '';
   _status.value = 'Not Read';
   _tbody.appendChild(_form);
})

//Book object constructor
function Book(title, author, total, readPages, status) {
   this.title = title;
   this.author = author;
   this.totalPages = parseInt(total);
   this.pagesRead = parseInt(readPages);
   this.status = status;
}

function validate() {
   if (_title.value      === '' || 
       _author.value     === '' ||
       _totalPages.value === '' ||
       _readPages.value  === '')
   {
      alert("Please fill out all fields.");
      return -1;
   }
   else if (isNaN(parseInt(_totalPages.value)) ||
            isNaN(parseInt(_readPages.value))  ||
            parseInt(_totalPages.value) < 0 ||
            parseInt(_readPages.value) < 0)
   {
      alert("Please enter a positive number for page numbers.");
      return -1;
   }
   else if (parseInt(_totalPages.value) < parseInt(_readPages.value))
   {
      alert("Total pages cannot be less than pages read.");
      return -1;
   }

   return 0;
}

function addBookToLibrary(book)
{
      myLibrary.push(book);
      render();
}

function render()
{
   _tbody.innerHTML = '';
   myLibrary.forEach((book) => {
      let index = myLibrary.indexOf(book);
      let tr = document.createElement('tr');
      let tdTitle = document.createElement('td');
      let tdAuthor = document.createElement('td');
      let tdPages = document.createElement('td');
      let tdStatus = document.createElement('td');

      tdTitle.textContent = book.title;
      tdAuthor.textContent = book.author;
      tdPages.textContent = `${book.pagesRead}/${book.totalPages}`;
      tdStatus.textContent = book.status;

      tr.appendChild(tdTitle);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdPages);
      tr.appendChild(tdStatus);
      let editDeleteCopy = _editDelete.cloneNode(true);
      let editBtn = editDeleteCopy.querySelector('.edit');
      editBtn.setAttribute('data-index', `${index}`);
      editBtn.addEventListener('click', () => {
         _form.setAttribute('data-index', editBtn.dataset.index);
         _tbody.replaceChild(_form, editBtn.parentElement.parentElement);
         });

      let deleteBtn = editDeleteCopy.querySelector('.delete');
      deleteBtn.setAttribute('data-index', `${index}`);

      tr.appendChild(editDeleteCopy);
      tr.appendChild(_new);

      _tbody.appendChild(tr);
   })
}
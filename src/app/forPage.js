const bookList = [];
const RENDER_EVENT = 'render-todo';
 
function generateId() {
  return +new Date();
}
 
function generatebookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  }
}
 
function findBook(bookId) {
  for (const bookItem of bookList) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}
 
function findBookIndex(bookId) {
  for (const index in bookList) {
    if (bookList[index].id === bookId) {
      return index;
    }
  }
  return -1;
}
 
function makeBook(bookObject) {
 
  const {id, title,author, year, isComplete} = bookObject;
 
  const textTitle = document.createElement('h2');
  textTitle.innerText = title;
 
  const textAuthor = document.createElement('p');
  textAuthor.innerText = author;
 
  const textYear = document.createElement('p');
  textYear.innerText = year;
 
  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textAuthor, textYear);
 
  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.style.gap = "3px";
  container.append(textContainer);
  container.setAttribute('id', `todo-${id}`);
 
  if (isComplete) {
 
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
    undoButton.innerHTML = "belum selesai";
    undoButton.style.backgroundColor = "white";
    undoButton.style.padding = "2px";
    undoButton.style.borderRadius = "5px";
    undoButton.style.border = "1px solid black";
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(id);
    });
 
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.innerHTML = "hapus";
    trashButton.style.backgroundColor = "red";
    trashButton.style.padding = "2px";
    trashButton.style.borderRadius = "5px";
    trashButton.style.color = "white";
    trashButton.style.border = "1px solid black";
    trashButton.style.marginLeft = "5px";
    trashButton.addEventListener('click', function () {
      removetitleFromCompleted(id);
    });
 
    container.append(undoButton,trashButton);
  } else {
 
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.innerHTML = "selesai";
    checkButton.style.backgroundColor = "green";
    checkButton.style.color = "white";
    checkButton.style.border = "1px solid black";
    checkButton.style.borderRadius = "5px";
    checkButton.style.padding = "2px";
    checkButton.addEventListener('click', function () {
      addtitleToCompleted(id);
    });
 
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.innerHTML = "hapus";
    trashButton.style.backgroundColor = "red";
    trashButton.style.padding = "2px";
    trashButton.style.borderRadius = "5px";
    trashButton.style.color = "white";
    trashButton.style.border = "1px solid black";
    trashButton.style.marginLeft = "5px";
    trashButton.addEventListener('click', function () {
      removetitleFromCompleted(id);
    });
    container.append(checkButton,trashButton);
  }
  return container;
}
 
function addBook() {
  const addTitle = document.getElementById('inputTextBook').value;
  const addYear = document.getElementById('inputBookYear').value;
  ;
  const addAuthor = document.getElementById('inputBookAuthor').value;
  const generatedID = generateId();
  const bookObject = generatebookObject(generatedID, addTitle, addAuthor,parseInt(addYear),false);
  bookList.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
 
function addtitleToCompleted(bookId /* HTMLELement */) {
 
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;
 
  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
 
function removetitleFromCompleted(bookId /* HTMLELement */) {
  const bookTarget = findBookIndex(bookId);
 
  if (bookTarget === -1) return;
 
  bookList.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
 
function undoTaskFromCompleted(bookId /* HTMLELement */) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}
 
document.addEventListener('DOMContentLoaded', function () {
  const submitForm /* HTMLFormElement */ = document.getElementById('inputBook');
 
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
});
 
document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookShelf = document.getElementById('inCompletedBookshelfList');
  const completedBookshelf = document.getElementById('completedBookshelfList');
 
  // clearing list item
  uncompletedBookShelf.innerHTML = '';
  completedBookshelf.innerHTML = '';
 
  for (const bookItem of bookList) {
    const bookElement = makeBook(bookItem);
    if (bookItem.isComplete === true) {
      completedBookshelf.append(bookElement);
    } else if (bookItem.isComplete === false){
      uncompletedBookShelf.append(bookElement);
    }
  }
});
 
function saveData(){
  if (isStorageExist()){
    const parsed = JSON.stringify(bookList);
    localStorage.setItem(STORAGE_KEY,parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}
 
const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO-APPS';
 
function isStorageExist(){
  if (typeof (Storage)=== undefined){
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}
 
document.addEventListener(SAVED_EVENT, function(){
  console.log(localStorage.getItem(STORAGE_KEY));
});
 
function loadDataFromStorage(){
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null ){
    for (const book of data){
      bookList.push(book);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}
 
document.addEventListener('DOMContentLoaded', function () {
  // ...
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});


/*<>
<header className="flex justify-between items-center mb-4">
<h1 className="text-2xl">Todos</h1>
<Link
  className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
  href="/new"
>
  New
</Link>
</header>
<ul className="pl-4">
{todos.map(todo => (
  <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
))}
</ul>
</>*/
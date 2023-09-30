"use strict";

let myLibrary = [];
const cardbody = document.body.querySelector(".cardbody");
const newBookButton = document.querySelector("#newBook");
const modal = document.querySelector(".modal");
const form = document.getElementById('bookForm');

cardbody.addEventListener("click", e => {
  e.preventDefault();

  let num = e.target.parentElement.dataset.internalNumber;

  if(e.target.innerHTML == "Remove") remove(num);
  if(e.target.innerHTML == "Read") toggleRead(num);

  showCards(myLibrary);
});

function remove(num){
  myLibrary.splice(num, 1);
};

function toggleRead(num){
  let item = myLibrary[num];
  item.switchread();
};

form.addEventListener('submit', e => {
  e.preventDefault();

  let author = document.getElementById('author').value;
  let title = document.getElementById('title').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;

  addBookToLibrary(author, title, pages, read);

  document.getElementById('author').value = '';
  document.getElementById('title').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = false;

  showCards(myLibrary);
  modal.close();
});

newBookButton.addEventListener("click", () => {
  modal.showModal();
})

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
};

Book.prototype.switchread = function(){
  this.read = !this.read;
};

function addBookToLibrary(author, title, pages, read) {
  myLibrary.push(new Book(author, title, pages, read))
};

//author, title, number of pages, whether it’s been read

//.classList.add()

function createCard(book){
  const c = document.createElement("div");
  c.classList.add("card");
  
  let au = document.createElement("p");
  au.innerText = "Author: " + book.author;
  c.append(au);
  let ti = document.createElement("p");
  ti.innerText = "Title: " + book.title;
  c.append(ti);
  let pa = document.createElement("p");
  pa.innerText = "Pages: " + book.pages;
  c.append(pa);
  let re = document.createElement("p");
  re.innerText = "Read: " + book.read;
  c.append(re);

  c.dataset.internalNumber = book.internalNumber;

  let removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  c.append(removeButton);

  let toggleReadButton = document.createElement("button");
  toggleReadButton.innerText = "Read";
  c.append(toggleReadButton);

  cardbody.append(c);
};

function showCards(arr){
  cardbody.innerText = "";
  for(let i = 0; i < arr.length; i++){
    arr[i].internalNumber = i;
    createCard(arr[i]);
  };
};

showCards(myLibrary);
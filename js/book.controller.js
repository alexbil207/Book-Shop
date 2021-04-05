'use strict';

window.addEventListener('load', onInit);

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map((book) => {
        return `
        <div class="book-box" data-id="${book.id}">
            <img src="${book.image}" alt="">
            <h2>${book.name}</h2>
            <h3 data-id="${book.id}">${book.price}</h3>
            <div>
            <button class="read-btn" onclick="onReadBook('${book.id}')">Read</button>
            <button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="remove-btn" onclick="onRemoveBook('${book.id}')">Remove</button>
            </div>
        </div>`
    })
    if (!books.length) {
        document.querySelector('.books-container').innerHTML = `<h2>Add Books To Your Shop</h2>`;
        return;
    }
    document.querySelector('.books-container').innerHTML = strHtmls.join('');

}

function renderModal(book) {
    var strHtmls = `
        <img src="${book.image}" alt="">
        <h2>${book.name}</h2>
        <p>${book.author}<p>
        <p>${book.description}</p>
        <h3>${book.price}</h3>
        <button onclick="onCloseModal()">Close</button>`
    var modal = document.querySelector('.book-data');
    modal.innerHTML = strHtmls;
    modal.classList.remove('hidden');
}

function onReadBook(bookId) {
    var book = getBook(bookId);
    renderModal(book);
}

function onCloseModal() {
    var modal = document.querySelector('.book-data');
    modal.classList.add('hidden');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onUpdateBook(bookId) {
    var price = document.querySelector(`h3[data-id="${bookId}`)
    price.innerHTML = `
    <input type="number" placeholder="Enter new Price"/>
    <button class="price-update-btn" onclick="onPriceUpdate('${bookId}')">Update</button>
    `
}

function onPriceUpdate(bookId) {
    var price = document.querySelector('h3 input');
    priceUpdate(bookId, price.value);
    renderBooks();
}

function onNewBook() {
    var modal = document.querySelector('.book-data');
    renderNewBookModal(modal);
}

function renderNewBookModal(modal) {
    var strHtmls = `
    <div class="image-choose">
        <label for="img">Choose Image</label>
        <input id="img" type="file">
    </div>
    <input class="book-name" type="text" placeholder="Enter Book Name">
    <input class="book-author" type="text" placeholder="Enter Book Author">
    <input class="book-price" type="number" placeholder="Enter price">
    <input class="book-description" type="text" placeholder="Enter description">
    <div class="new-book-btns">
    <button onclick="onCreateBook()">Create</button>
    <button onclick="onCloseModal()">Close</button>
    </div >`
    modal.innerHTML = strHtmls;
    modal.classList.remove('hidden');
}

function onCreateBook() {
    var image = document.querySelector('.image-choose input').value;
    var name = document.querySelector('.book-name').value;
    var author = document.querySelector('.book-author').value;
    var price = document.querySelector('.book-price').value;
    var description = document.querySelector('.book-description').value;
    if (!name || !author || !price || !description) return;
    var newBook = {
        image: image,
        name: name,
        author: author,
        price: `$${price}`,
        description: description
    }
    createBooks(newBook);
    onCloseModal();
    renderBooks();
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onBackPage() {
    backPage();
    renderBooks();
}



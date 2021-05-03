'use strict';
const KEY = 'books';
const PAGE_SIZE = 5;
var gPageIdx = 0;
var gBooks = [
    {
        id: makeId(),
        name: 'Eloquent JavaScript, Second Edition',
        author: 'Marijn Haverbeke',
        image: '../images/Eloquent JavaScript, Second Edition.png',
        description: 'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
        price: '$100'
    },
    {
        id: makeId(),
        name: 'Speaking JavaScript',
        author: 'Axel Rauschmayer',
        image: '../images/Speaking JavaScript.jpg',
        description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.',
        price: '$120'
    },
    {
        id: makeId(),
        name: 'Programming JavaScript Applications',
        author: 'Eric Elliott',
        image: '../images/Programming JavaScript Applications.jpg',
        description: 'Take advantage of JavaScript\'s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that\'s easier-yes, easier-to work with as your code base grows.',
        price: '$170'
    },
    {
        id: makeId(),
        name: 'Understanding ECMAScript 6',
        author: 'Nicholas C. Zakas',
        image: '../images/Understanding ECMAScript 6.jpg',
        description: 'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.',
        price: '$60'
    },
    {
        id: makeId(),
        name: 'You Don\'t Know JS',
        author: 'Kyle Simpson',
        image: '../images/You Don\'t Know JS.jpg',
        description: 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the \'You Don’t Know JS\' series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.',
        price: '$200'
    },
    {
        id: makeId(),
        name: 'Git Pocket Guide',
        author: 'Richard E. Silverman',
        image: '../images/Git Pocket Guide.jpg',
        description: 'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git experience.',
        price: '$80'
    },
    {
        id: makeId(),
        name: 'Designing Evolvable Web APIs with ASP.NET',
        author: 'Glenn Block, et al.',
        image: '../images/Designing Evolvable Web APIs with ASP.NET.jpg',
        description: 'Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft’s ASP.NET Web API framework. In the process, you’ll learn how design and implement a real-world Web API.',
        price: '$150'
    }
]

function getBooks() {
    if (loadFromStorage(KEY)) var books = loadFromStorage(KEY);
    else {
        _saveBooksToStorage();
        var books = loadFromStorage(KEY);
    }
    var startIdx = gPageIdx * PAGE_SIZE;
    return books.slice(startIdx, startIdx + PAGE_SIZE);

}

function getBook(bookId) {
    var books = getBooks();
    return books.find((book) => { return book.id === bookId })
}


function priceUpdate(bookId, price) {
    var books = loadFromStorage(KEY);
    var bookIdx = books.findIndex((book) => { return book.id === bookId })
    books[bookIdx].price = `$${price}`;
    saveToStorage(KEY, books);
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function backPage() {
    if (!gPageIdx) return
    gPageIdx--;
}

function removeBook(bookId) {
    var books = loadFromStorage(KEY);
    var bookIdx = books.findIndex((book) => { return bookId === book.id })
    books.splice(bookIdx, 1)
    saveToStorage(KEY, books);
}

function createBooks(newBook) {
    _createBook(newBook);
}

function _createBook(newBook) {
    var books = loadFromStorage(KEY);
    newBook.id = makeId();
    newBook.image = './images/book-default.png';
    books.push(newBook);
    saveToStorage(KEY, books);

}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

document.addEventListener("DOMContentLoaded", () => {
  setupSearch();
});

function setupSearch() {
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("search-btn");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      searchBooks(query);
    }
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        searchBooks(query);
      }
    }
  });
}

async function searchBooks(query) {
  const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}+inauthor:Agatha+Christie`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayBooks(data.items);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
  }
}

function displayBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  books.forEach((book) => {
    const bookInfo = book.volumeInfo;
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
          <img src="${
            bookInfo.imageLinks?.thumbnail || "images/default-cover.jpg"
          }" alt="${bookInfo.title}">
          <h3>${bookInfo.title}</h3>
          <p>${
            bookInfo.authors
              ? bookInfo.authors.join(", ")
              : "Autor desconhecido"
          }</p>
          <button onclick="viewDetails('${book.id}')">Ver detalhes</button>
      `;

    bookList.appendChild(bookCard);
  });
}

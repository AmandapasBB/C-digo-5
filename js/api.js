// api.js - Conexão com a Google Books API e funcionalidade de busca

const API_URL = "https://www.googleapis.com/books/v1/volumes";

// Inicializa a página
document.addEventListener("DOMContentLoaded", () => {
  setupButtons();
});

async function fetchBooks(query = "", startIndex = 0) {
  try {
    let url = query
      ? `${API_URL}?q=${encodeURIComponent(
          query
        )}+inauthor:Agatha+Christie&maxResults=20`
      : `${API_URL}?q=inauthor:Agatha+Christie&maxResults=20&startIndex=${startIndex}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
      displayBooks(data.items);
    } else {
      document.getElementById("book-list").innerHTML =
        "<p>Nenhum livro encontrado.</p>";
    }
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

function setupButtons() {
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("search-btn");
  const allBooksButton = document.getElementById("all-books-btn");
  const favoritesButton = document.getElementById("favorites-btn");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchBooks(query);
    }
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        fetchBooks(query);
      }
    }
  });

  allBooksButton.addEventListener("click", () => {
    fetchBooks();
  });

  favoritesButton.addEventListener("click", () => {
    window.location.href = "favorites.html";
  });
}

function viewDetails(bookId) {
  window.location.href = `../detalhes/detalhes.html?id=${bookId}`;
}

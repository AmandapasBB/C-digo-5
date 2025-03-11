const API_URL = "https://www.googleapis.com/books/v1/volumes";

// Inicializa a página
document.addEventListener("DOMContentLoaded", () => {
  setupButtons();
});

// Busca livros na API do Google Books
async function fetchBooks(query = "", startIndex = 0) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "<p>Carregando livros...</p>"; // Exibe um feedback visual

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
      bookList.innerHTML = "<p>Nenhum livro encontrado.</p>";
    }
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    bookList.innerHTML =
      "<p>Ocorreu um erro ao buscar os livros. Tente novamente.</p>";
  }
}

// Exibe os livros na tela
function displayBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // Limpa a lista antes de exibir os novos livros

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
        bookInfo.authors ? bookInfo.authors.join(", ") : "Autor desconhecido"
      }</p>
      <button onclick="viewDetails('${book.id}')">Ver detalhes</button>
    `;

    bookList.appendChild(bookCard);
  });
}

// Configura os botões de busca e exibição de livros
function setupButtons() {
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("search-btn");
  const allBooksButton = document.getElementById("all-books-btn");

  if (searchButton && searchInput) {
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
  }

  if (allBooksButton) {
    allBooksButton.addEventListener("click", () => {
      fetchBooks();
    });
  }
}

// Redireciona para a página de detalhes do livro
function viewDetails(bookId) {
  window.location.href = `../detalhes/detalhes.html?id=${bookId}`;
}

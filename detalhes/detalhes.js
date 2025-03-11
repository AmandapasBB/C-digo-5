document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  if (bookId) {
    fetchBookDetails(bookId);
  } else {
    document.getElementById("book-details").innerHTML =
      "<p>Livro não encontrado.</p>";
  }
});

async function fetchBookDetails(bookId) {
  const API_URL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

  try {
    const response = await fetch(API_URL);
    const book = await response.json();
    displayBookDetails(book);
  } catch (error) {
    console.error("Erro ao buscar detalhes do livro:", error);
  }
}

function displayBookDetails(book) {
  const bookInfo = book.volumeInfo;
  const detailsContainer = document.getElementById("book-details");

  detailsContainer.innerHTML = `
      <img src="${
        bookInfo.imageLinks?.thumbnail || "images/default-cover.jpg"
      }" alt="${bookInfo.title}">
      <h2>${bookInfo.title}</h2>
      <p><strong>Autor(es):</strong> ${
        bookInfo.authors ? bookInfo.authors.join(", ") : "Desconhecido"
      }</p>
      <p><strong>Data de publicação:</strong> ${
        bookInfo.publishedDate || "Não disponível"
      }</p>
      <p class="description"><strong>Descrição:</strong> ${
        bookInfo.description || "Sem descrição disponível."
      }</p>
      <button onclick="window.location.href='../Home/index.html'">Voltar</button>
  `;
}

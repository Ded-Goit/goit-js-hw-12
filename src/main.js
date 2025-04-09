// Import the library for displaying notifications
import iziToast from 'izitoast';
// Import styles for iziToast
import 'izitoast/dist/css/iziToast.min.css';
// Import the necessary modules and functions
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showMoreLoader,
  hideMoreLoader,
} from './js/render-functions';
// Отримуємо елемент кнопки "Load more" із DOM
const loadMoreBtn = document.querySelector('.gallery-button');

// Get a link to the search form from the DOM
const form = document.querySelector('.form');
// Глобальні змінні для збереження стану
let currentQuery = ''; // збережене ключове слово пошуку
let currentPage = 1; // поточна сторінка для пагінації
let totalHits = 0; // загальна кількість знайдених зображень
// Add an event handler for the form on the 'submit' event
form.addEventListener('submit', async event => {
  event.preventDefault(); // Prevent the default form behavior (page reload)
  // Get the search query value and remove extra spaces
  const query = event.target.elements['search-text'].value.trim();
  if (query !== currentQuery) {
    currentQuery = query;
    currentPage = 1;
    clearGallery(); // Clear previous search results
    hideLoadMoreButton(); // ховає кнопку Load More
  }
  if (!query) {
    // If the search field is empty, display an error message
    iziToast.error({ message: 'Please enter a search term!' });
    return;
  }

  await fetchImages({ isLoadMore: false });
  form.reset(); // Очищує поле вводу після пошуку
});

// Обробник кліку на кнопку "Load more"
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchImages({ isLoadMore: true });
});

// Основна функція для отримання зображень із API
async function fetchImages({ isLoadMore }) {
  if (isLoadMore) {
    showMoreLoader();
  } else {
    showLoader();
  }

  // Make a GET request to Pixabay API with the required parameters
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      // If no images are found, display a warning
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(data.hits);
    if (currentPage * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
    smoothScroll();
  } catch (error) {
    console.error('Error fetching images:', error);
    // In case of an error, display an error message
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    if (isLoadMore) {
      hideMoreLoader();
    } else {
      hideLoader(); // Hide the loading indicator regardless of the result}
    }
  }
}
// Плавна прокрутка сторінки
function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;

  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
// style for button load more
document.querySelector('.gallery-button').onmousemove = e => {
  const x = e.pageX - e.target.offsetLeft;
  const y = e.pageY - e.target.offsetTop;

  e.target.style.setProperty('--x', `${x}px`);
  e.target.style.setProperty('--y', `${y}px`);
};

// Import the library for displaying notifications
import iziToast from 'izitoast';
// Import styles for iziToast
import 'izitoast/dist/css/iziToast.min.css';
// Імпортуємо функцію для отримання зображень із Pixabay API
import { getImagesByQuery } from './js/pixabay-api';
// Імпортуємо допоміжні функції для роботи з галереєю та інтерфейсом
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
  // отримуємо пошуковий запит
  const query = event.target.elements['search-text'].value.trim();
  if (query !== currentQuery) {
    currentQuery = query; // оновлюємо збережений запит
    currentPage = 1; // скидаємо сторінку на початок
    clearGallery(); // Clear previous search results
    hideLoadMoreButton(); // ховає кнопку Load More
  }
  if (!query) {
    // If the search field is empty, display an error message
    iziToast.error({ message: 'Please enter a search term!' });
    return;
  }

  await fetchImages({ isLoadMore: false }); // викликаємо функцію пошуку (початковий запит)
  form.reset(); // Очищує поле вводу після пошуку
});

// Обробник кліку на кнопку "Load more"
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1; // збільшуємо сторінку на 1
  await fetchImages({ isLoadMore: true }); // викликаємо функцію пошуку (наступна порція)
});

// Основна функція для отримання зображень із API
async function fetchImages({ isLoadMore }) {
  if (isLoadMore) {
    showMoreLoader(); // показуємо індикатор під кнопкою (тільки при додатковому запиті)
  } else {
    showLoader(); // показуємо глобальний індикатор (тільки при першому запиті)
  }

  // Make a GET request to Pixabay API with the required parameters
  try {
    const data = await getImagesByQuery(currentQuery, currentPage); //що тут
    totalHits = data.totalHits; //що тут

    if (data.hits.length === 0) {
      // If no images are found, display a warning
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(data.hits); // додаємо зображення до галереї
    if (currentPage * 15 >= totalHits) {
      hideLoadMoreButton(); // якщо досягли кінця — ховаємо кнопку
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton(); // якщо є ще зображення — показуємо кнопку
    }
    smoothScroll(); // плавно прокручуємо сторінку до нових результатів
  } catch (error) {
    console.error('Error fetching images:', error);
    // In case of an error, display an error message
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    if (isLoadMore) {
      hideMoreLoader(); // Hide the moreloading indicator regardless of the result
    } else {
      hideLoader(); // Hide the loading indicator regardless of the result
    }
  }
}
// Функція плавної прокрутки до нових елементів
function smoothScroll() {
  const card = document.querySelector('.gallery-item'); //шукаємо першу карточку галереї
  if (!card) return; //якщо не знайшли припиняємо виконання функції

  const cardHeight = card.getBoundingClientRect().height; //отримуємо висоту карточки
  // повільно скролимо на подвійну висоту карточки
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
// Анімація кнопки "Load more" при русі миші
// Визначаємо позицію курсора відносно кнопки та передаємо у CSS через custom properties
document.querySelector('.gallery-button').onmousemove = e => {
  const x = e.pageX - e.target.offsetLeft; // координата X всередині кнопки
  const y = e.pageY - e.target.offsetTop; // координата Y всередині кнопки

  e.target.style.setProperty('--x', `${x}px`); // передаємо координати як змінні для стилів
  e.target.style.setProperty('--y', `${y}px`);
};

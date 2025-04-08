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
} from './js/render-functions';

const loadMoreBtn = document.querySelector('.gallery-button');

// Get a link to the search form from the DOM
const form = document.querySelector('.form');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
// Add an event handler for the form on the 'submit' event
form.addEventListener('submit', async event => {
  event.preventDefault(); // Prevent the default form behavior (page reload)
  // Get the search query value and remove extra spaces
  currentQuery = event.target.elements['search-text'].value.trim();
  if (!currentQuery) {
    // If the search field is empty, display an error message
    iziToast.error({ message: 'Please enter a search term!' });
    return;
  }
  currentPage = 1;
  clearGallery(); // Clear previous search results
  hideLoadMoreButton();
  await fetchImages();
});
/*console.log(form);*/

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchImages();
});
/*console.log(fetchImages());*/

async function fetchImages() {
  showLoader();
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
    hideLoader(); // Hide the loading indicator regardless of the result
  }
}

function smoothScroll() {
  const { heigth: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
// cod for button load more
document.querySelector('.gallery-button').onmousemove = e => {
  const x = e.pageX - e.target.offsetLeft;
  const y = e.pageY - e.target.offsetTop;

  e.target.style.setProperty('--x', `${x}px`);
  e.target.style.setProperty('--y', `${y}px`);
};

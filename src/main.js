// Import the library for displaying notifications
import iziToast from 'izitoast';
// Import styles for iziToast
import 'izitoast/dist/css/iziToast.min.css';
// Import the function for getting images from Pixabay API
import { getImagesByQuery } from './js/pixabay-api';
// Import auxiliary functions for working with the gallery and interface
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
// Get the "Load more" button element from the DOM
const loadMoreBtn = document.querySelector('.gallery-button');
// Get a link to the search form from the DOM
const form = document.querySelector('.form');
// Global variables to save state
let currentQuery = ''; // saved search keyword
let currentPage = 1; // current page for pagination
let totalHits = 0; // total number of images found

// Add an event handler for the form on the 'submit' event
form.addEventListener('submit', async event => {
  event.preventDefault(); // Prevent the default form behavior (page reload)
  // get the search query
  const query = event.target.elements['search-text'].value.trim();
  if (query !== currentQuery) {
    currentQuery = query; // update the saved query
    currentPage = 1; // reset the page to the beginning
    clearGallery(); // Clear previous search results
    hideLoadMoreButton(); // hides the Load More button
  }
  if (!query) {
    // If the search field is empty, display an error message
    iziToast.error({ message: 'Please enter a search term!' });
    return;
  }

  await fetchImages({ isLoadMore: false }); // call the search function (initial query)
  form.reset(); // Clears the input field after searching
});

// Handler for clicking on the "Load more" button
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1; // increase the page by 1
  await fetchImages({ isLoadMore: true }); // call the search function (next portion)
});

// The main function for retrieving images from the API
async function fetchImages({ isLoadMore }) {
  if (isLoadMore) {
    showMoreLoader(); // show the indicator under the button (only on additional request)
  } else {
    showLoader(); // show the global indicator (only on the first request)
  }

  // Make a GET request to Pixabay API with the required parameters
  try {
    const data = await getImagesByQuery(currentQuery, currentPage); // make a request to the API
    totalHits = data.totalHits; // store the total number of results

    if (data.hits.length === 0) {
      // If no images are found, display a warning
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(data.hits); // add images to the gallery
    if (currentPage * 15 >= totalHits) {
      hideLoadMoreButton(); // if you've reached the end — hide the button
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton(); // if there are more images — show the button
    }
    smoothScroll(); // smoothly scroll the page to new results
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
// Smooth scrolling function to new items
function smoothScroll() {
  const card = document.querySelector('.gallery-item'); //look for the first gallery card
  if (!card) return; //if not found, stop executing the function

  const cardHeight = card.getBoundingClientRect().height; //get the height of the card
  //slowly scroll to double the height of the card
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
// "Load more" button animation when moving the mouse
// Determine the cursor position relative to the button and pass it to CSS via custom properties
document.querySelector('.gallery-button').onmousemove = e => {
  const x = e.pageX - e.target.offsetLeft; // X coordinate inside the button
  const y = e.pageY - e.target.offsetTop; // Y coordinate inside the button

  e.target.style.setProperty('--x', `${x}px`); // pass the coordinates as variables for styles
  e.target.style.setProperty('--y', `${y}px`);
};

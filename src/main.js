// Import the library for displaying notifications
import iziToast from 'izitoast';
// Import styles for iziToast
import 'izitoast/dist/css/iziToast.min.css';
// Import the SimpleLightbox library to create a modal image window
import SimpleLightbox from 'simplelightbox';
// Import the styles for SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css';
// Import the necessary modules and functions
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
// Create an instance of SimpleLightbox for the gallery items
const lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
// Get a link to the search form from the DOM
const form = document.querySelector('.form');
// Add an event handler for the form on the 'submit' event
form.addEventListener('submit', async event => {
  event.preventDefault(); // Prevent the default form behavior (page reload)
  // Get the search query value and remove extra spaces
  const query = event.target.elements['search-text'].value.trim();
  if (!query) {
    // If the search field is empty, display an error message
    iziToast.error({ message: 'Please enter a search term!' });
    return;
  }

  clearGallery(); // Clear previous search results
  showLoader(); // Display the loading indicator
  // Make a GET request to Pixabay API with the required parameters
  try {
    const images = await getImagesByQuery(query); // Search for images based on the entered query

    if (images.length === 0) {
      // If no images are found, display a warning
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      // If the image is found, create a gallery
      createGallery(images);
      lightbox.refresh();
    } // In case of an error, display it using the iziToast library
  } catch (error) {
    // In case of an error, display an error message
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader(); // Hide the loading indicator regardless of the result
    event.target.reset(); //clear the input field
  }
});

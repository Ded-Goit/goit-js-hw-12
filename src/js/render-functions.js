// Import the SimpleLightbox library to create a modal image window
import SimpleLightbox from 'simplelightbox';
// Import the styles for SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css';
// Get a reference to the gallery container from the DOM
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadermore = document.querySelector('.loader-more');
// Initialize SimpleLightbox for gallery
const lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img', // Where to get the caption for the image
  captionsData: 'alt', // Use the alt attribute as the caption
  captionPosition: 'bottom', // The caption will be at the bottom of the image
  captionDelay: 250, // Delay before displaying the caption
});
// Function to create and display image gallery
export function createGallery(images) {
  if (!Array.isArray(images)) return;
  // Generate HTML markup for each image
  const markup = images
    .map(
      ({
        webformatURL, // Image URL for preview
        largeImageURL, // Large image URL for modal
        tags, // Image description (alternative text)
        likes, // Number of likes
        views, // Number of views
        comments, // Number of comments
        downloads, // Number of downloads
      }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}" title="${tags}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </li>
  `
    )
    .join(''); //(Lazy loading)
  // Add the generated markup to the gallery container
  gallery.insertAdjacentHTML('beforeend', markup); //inserts the received nodes into the DOM tree at the specified position
  lightbox.refresh(); // Update the SimpleLightbox instance for new gallery items
}
// Function to clear the gallery
export function clearGallery() {
  gallery.innerHTML = '';
}
// Function to show the loading indicator
export function showLoader() {
  /*console.log(' show Loader');*/
  loader.classList.remove('hidden');
}
// Function to hide the loading indicator
export function hideLoader() {
  /*console.log('hide Loader');*/
  loader.classList.add('hidden');
}
// Function to show the loading indicator more load
export function showMoreLoader() {
  /*console.log('show more Loader');*/
  loadermore.classList.remove('hidden');
}
// Function to hide the loading indicator more load
export function hideMoreLoader() {
  /*console.log('hide more Loader');*/
  loadermore.classList.add('hidden');
}
// Function to show the button Load More
export function showLoadMoreButton() {
  document.querySelector(`.gallery-button`).classList.remove('hidden');
}
// Function to hide the button Load More
export function hideLoadMoreButton() {
  document.querySelector(`.gallery-button`).classList.add('hidden');
}

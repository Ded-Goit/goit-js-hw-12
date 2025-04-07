// Import the SimpleLightbox library to create a modal image window
import SimpleLightbox from 'simplelightbox';
// Import the styles for SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css';
// Get a reference to the gallery container from the DOM
const gallery = document.querySelector('.gallery');

const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
// Function to create and display image gallery
export function createGallery(images) {
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
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
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
    .join('');
  // Add the generated markup to the gallery container
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // Update the SimpleLightbox instance for new gallery items
}
// Function to clear the gallery
export function clearGallery() {
  gallery.innerHTML = '';
}
// Function to show the loading indicator
export function showLoader() {
  /*console.log(' show Loader');*/
  document.querySelector('.loader').classList.remove('hidden');
}
// Function to hide the loading indicator
export function hideLoader() {
  /*console.log(' hide Loader');*/
  document.querySelector('.loader').classList.add('hidden');
}
export function showLoadMoreButton() {
  document.querySelector(`.gallery-button`).classList.remove('hidden');
}
export function hideLoadMoreButton() {
  document.querySelector(`.gallery-button`).classList.add('hidden');
}

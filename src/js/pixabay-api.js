// Import the axios library to make HTTP requests
import axios from 'axios';
// Declare an asynchronous function to retrieve images by query
const API_KEY = '49617866-877f488ac6d2fa69158bf0643'; // my unique Pixabay API access key
const BASE_URL = 'https://pixabay.com/api/'; // Base address for API requests
const PER_PAGE = 15; // Number of images to download per request (pagination)
// Export an asynchronous function to get images by keyword and page
export async function getImagesByQuery(query, page = 1) {
  // Form the query parameters as a URL search string
  const params = new URLSearchParams({
    key: API_KEY, // Pass our API key
    q: query, // Search query entered by the user
    image_type: 'photo', // Image type: photo
    orientation: 'horizontal', // Image orientation: horizontal
    safesearch: true, // Enable safe search
    page: page, // Page number for pagination
    per_page: PER_PAGE, // Number of images per page
  });
  // Make an HTTP request using fetch with constructed parameters
  const response = await fetch(`${BASE_URL}?${params}`);
  // If the response is incorrect (not a 200 status), throw an error
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // Convert the response from JSON format to a JavaScript object
  const data = await response.json();
  // Return the received data (an object containing an array of images and a total count)
  return data;
}

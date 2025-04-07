// Import the axios library to make HTTP requests
import axios from 'axios';
// Declare an asynchronous function to retrieve images by query
const API_KEY = '49617866-877f488ac6d2fa69158bf0643';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = new URLSearchParams({
    key: API_KEY, // Pass our API key
    q: query, // Search query entered by the user
    image_type: 'photo', // Image type: photo
    orientation: 'horizontal', // Image orientation: horizontal
    safesearch: true, // Enable safe search
    page: page,
    per_page: PER_PAGE,
  });
  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
/*console.log(getImagesByQuery());*/

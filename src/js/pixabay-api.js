// Import the axios library to make HTTP requests
import axios from 'axios';
// Declare an asynchronous function to retrieve images by query
const API_KEY = '49617866-877f488ac6d2fa69158bf0643';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY, // Pass our API key
      q: query, // Search query entered by the user
      image_type: 'photo', // Image type: photo
      orientation: 'horizontal', // Image orientation: horizontal
      safesearch: true, // Enable safe search
    },
  });
  // Return an array of images from the API response
  return response.data.hits;
}

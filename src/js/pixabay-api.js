// Import the axios library to make HTTP requests
import axios from 'axios';
// Declare an asynchronous function to retrieve images by query
const API_KEY = '49617866-877f488ac6d2fa69158bf0643'; // мій унікальний ключ доступу до Pixabay API
const BASE_URL = 'https://pixabay.com/api/'; // Базова адреса для запитів до API
const PER_PAGE = 15; // Кількість зображень, які потрібно завантажити за один запит (пагінація)
// Експортуємо асинхронну функцію для отримання зображень по ключовому слову та сторінці
export async function getImagesByQuery(query, page = 1) {
  // Формуємо параметри запиту як URL-пошуковий рядок
  const params = new URLSearchParams({
    key: API_KEY, // Pass our API key
    q: query, // Search query entered by the user
    image_type: 'photo', // Image type: photo
    orientation: 'horizontal', // Image orientation: horizontal
    safesearch: true, // Enable safe search
    page: page, // Номер сторінки для пагінації
    per_page: PER_PAGE, // Кількість зображень на одну сторінку
  });
  // Виконуємо HTTP-запит за допомогою fetch з побудованими параметрами
  const response = await fetch(`${BASE_URL}?${params}`);
  // Якщо відповідь некоректна (не статус 200), генеруємо помилку
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // Перетворюємо відповідь з JSON-формату в об'єкт JavaScript
  const data = await response.json();
  // Повертаємо отримані дані (об'єкт, що містить масив зображень і загальну кількість)
  return data;
}

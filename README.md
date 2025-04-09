# 🎴Image Search via Pixabay API[code refactoring](https://github.com/Ded-Goit/goit-js-hw-11)

This project allows users to search for images using
[Pixabay API.](https://pixabay.com/api/docs/). Results are displayed as a
gallery with a lightbox and rich metadata (likes, views, comments, downloads).
Built with JavaScript, Axios, iziToast, SimpleLightbox and Vite. To learn more
and configure additional features [see documentation](https://vitejs.dev/).

## 🔷 🔧 How it works:

      ✔ The user enters a query into a form.
      ✔ Submitting the form triggers an asynchronous request to the API.
      ✔ If images are found, they are rendered as cards in the gallery.
      ✔ If no images are found, a notification is displayed.
      ✔ Clicking on an image opens it in a modal window.
      ✔ There is a Load More button to load the next results (15 images per page).
      ✔ When the end of the collection is reached, a corresponding message is displayed.

      📌 Functionality
      ✔ 🔍 Image search by keyword
      ✔ 🖼 Display images as a gallery
      ✔ 💬 Interactive messages using iziToast
      ✔ 💡 Image caption via alt attribute in modal window
      ✔ Loader on loading
      ✔ 🔔 Notification when search results end
      ✔ 📱 Smooth scrolling after each query

      🧪 Notes and limitations
      ✔ 🔍 Pixabay free plan limit: up to 5000 queries/hour

      🔑 API Key
      To use the application, get an API key from Pixabay
      and paste it into the pixabay-api.js file in the API_KEY variable:

```js
const API_KEY = 'your-api-key-here';
```

## 🔧 Technologies

### ✅ JavaScript – main development language

### ✅ HTML/CSS – structure and styling

### ✅[Axios](https://axios-http.com/) – For HTTP-requests

### ✅[iziToasts](https://github.com/marcelodolza/iziToast/) – message output

### ✅[SimpleLightbox](https://github.com/andreknieriem/simplelightbox/) – image lightbox

## 📂 Project structure

       |──📁.github/workflows           # Files for GitHub Actions
       |──📁assets                      # Additional resources such as fonts, icons, etc.
       │───📁src                        # Project folder
       |   │──📁css                     # Project styles
       |   │──📁img                     # Image folder
       |   │──📁js                      # Logic folder
       |   |  |──📄 pixabay-api.js      # functions for HTTP requests
       |   |  |──📄 render-functions.js # functions for displaying interface elements
       │   │──📄 main.js                # application logic
       │   │──📄 index.html             # Home page of the website
       │──📄 .editorconfig              # Editor settings
       │──📄 .gitignore                 # Git ignore file
       │──📄 .prettierrc.json           # Code formatting configuration
       │──📄 README.md                  # Project description
       │──📄 package-lock.json          # dependency tree description
       │──📄 package.json               # Dependency information
       │──📄 vite.config.js             # Vite settings

### 🔷 📁 Main structure:

#### 🔹main.js (main file):

##### — Imports the necessary libraries and custom modules.

##### — Handles the form submission event. — Gets images from the API using fetchImages.

##### — Shows the loader, handles errors, renders the gallery.

#### 🔹render-functions.js (rendering module):

##### — creates HTML markup for the gallery based on the received images.

##### — clears the gallery before a new request.

##### — shows or hides the loading indicator.

#### 🔹pixabay-api.js (module API):

##### — performs an HTTP request to the Pixabay API with a given search query.

### 🔷 📦 Third-party libraries:

#### 🔹axios — for HTTP-requests.

#### 🔹iziToast — for displaying notifications (success, errors).

#### 🔹simplelightbox for beautiful image viewing in a modal window.

## 📦 Installation

###### 1. Clone the repository

`https://github.com/your-username/project-name.git`

###### 2. Change to the project directory

`cd project-name`

###### 3. Install dependencies

`npm install`

###### 4. Start the local server

`npm run dev`

👨‍💻 Author: [Ded-goIT] 📅 Date: [09.04.2025]

✅ The project was created to practice working with promises and asynchronous
JavaScript.

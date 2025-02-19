# Anime Website using JIKKAN API

This is an anime website built using the JIKKAN API. The website allows users to browse anime, view details, and search for their favorite shows and movies.

## Features
- Fetch and display anime information from the JIKKAN API
- Search functionality for anime titles
- Display detailed information about each anime, including synopsis, episodes, and ratings
- Responsive design for mobile and desktop users

## Technologies Used
- HTML, CSS, JavaScript
- JIKKAN API for anime data
- Frameworks/Libraries: (Add any libraries you used, e.g., React, Vue, Bootstrap)

## API Integration
- The website fetches data from the JIKKAN API using JavaScript's `axios()` function.
- API requests are structured as follows:
  ```javascript
  axios.get('https://api.jikan.moe/v4/anime')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching data:', error));
  ```

## Future Enhancements
- User authentication and watchlist feature
- Dark mode support
- Enhanced UI/UX improvements
- Improved search filters

## Contributions
Contributions are welcome! Feel free to submit a pull request or report any issues.

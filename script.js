// TMDB API Configuration
const API_KEY = '2696d2a038461087f9e32f5c386ecc62'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_ENDPOINT = '/search/movie';
const TRENDING_ENDPOINT = '/trending/movie/week';
const MOVIE_DETAILS_ENDPOINT = '/movie/';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('results');
const loader = document.getElementById('loader');
const message = document.getElementById('message');
const movieModal = document.getElementById('movieModal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');

// Navigation Elements
const navHome = document.getElementById('navHome');
const navTrending = document.getElementById('navTrending');
const navSearch = document.getElementById('navSearch');
const navContact = document.getElementById('navContact');
const navItems = document.querySelectorAll('.nav-item');

// Footer Navigation Elements
const footerHome = document.getElementById('footerHome');
const footerTrending = document.getElementById('footerTrending');
const footerSearch = document.getElementById('footerSearch');

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');

// Initialize theme from localStorage or default to light mode
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Modal close events
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Theme toggle event
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !movieModal.classList.contains('hidden')) {
        closeModal();
    }
});

// Navigation event listeners
navHome.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(0);
    loadTrendingMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

navTrending.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(1);
    loadTrendingMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

navSearch.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(2);
    searchInput.focus();
    window.scrollTo({ top: document.querySelector('.search-section').offsetTop - 100, behavior: 'smooth' });
});

navContact.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(3);
    const footer = document.getElementById('contact');
    window.scrollTo({ top: footer.offsetTop - 80, behavior: 'smooth' });
});

// Footer navigation
footerHome.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(0);
    loadTrendingMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

footerTrending.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(1);
    loadTrendingMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

footerSearch.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveNav(2);
    searchInput.focus();
    window.scrollTo({ top: document.querySelector('.search-section').offsetTop - 100, behavior: 'smooth' });
});

// Load trending movies on page load
window.addEventListener('DOMContentLoaded', async () => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        searchInput.value = lastSearch;
    }

    // Load trending movies
    await loadTrendingMovies();
});

// Main Search Handler
async function handleSearch() {
    const query = searchInput.value.trim();

    // Validate input
    if (!query) {
        showMessage('⚠️ Please enter a movie name', 'error');
        return;
    }

    // Save search to localStorage
    localStorage.setItem('lastSearch', query);

    // Clear previous results
    clearResults();
    showLoader();
    hideMessage();

    try {
        // Fetch movie data
        const movies = await searchMovies(query);

        hideLoader();

        // Handle no results
        if (movies.length === 0) {
            showMessage('😔 No movies found. Try another search!', 'error');
            return;
        }

        // Display results
        displayMovies(movies);

    } catch (error) {
        hideLoader();
        showMessage('❌ Something went wrong. Please try again later.', 'error');
        console.error('Error:', error);
    }
}

// Fetch Movies from TMDB API
async function searchMovies(query) {
    const url = `${BASE_URL}${SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
}

// Display Movies in Grid
function displayMovies(movies) {
    resultsSection.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        resultsSection.appendChild(movieCard);
    });
}

// Create Movie Card Element
function createMovieCard(movie) {
    const { id, title, poster_path, release_date, vote_average } = movie;

    // Create card container
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Poster image or placeholder
    const posterHTML = poster_path
        ? `<img src="${IMAGE_BASE_URL}${poster_path}" alt="${title}" class="movie-poster">`
        : `<div class="movie-poster no-image">🎬</div>`;

    // Format release date
    const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';

    // Format rating
    const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

    // Build card HTML
    card.innerHTML = `
        ${posterHTML}
        <div class="movie-info">
            <h3 class="movie-title">${title}</h3>
            <div class="movie-details">
                <span class="movie-date">${releaseYear}</span>
                <span class="movie-rating">${rating}</span>
            </div>
        </div>
    `;

    // Add click event to open modal
    card.addEventListener('click', () => openModal(id));
    card.style.cursor = 'pointer';

    return card;
}

// Clear Results
function clearResults() {
    resultsSection.innerHTML = '';
}

// Show Loader
function showLoader() {
    loader.classList.remove('hidden');
}

// Hide Loader
function hideLoader() {
    loader.classList.add('hidden');
}

// Show Message
function showMessage(text, type = '') {
    message.innerHTML = `<p>${text}</p>`;
    message.className = `message ${type}`;
    message.classList.remove('hidden');
}

// Hide Message
function hideMessage() {
    message.classList.add('hidden');
}

// Load Trending Movies
async function loadTrendingMovies() {
    showLoader();
    hideMessage();

    try {
        const url = `${BASE_URL}${TRENDING_ENDPOINT}?api_key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const movies = data.results || [];

        hideLoader();

        if (movies.length > 0) {
            message.innerHTML = '<p>🔥 Trending Movies This Week</p>';
            message.classList.remove('hidden');
            displayMovies(movies);
        } else {
            showMessage('🎥 Search for your favorite movies!');
        }
    } catch (error) {
        hideLoader();
        showMessage('🎥 Search for your favorite movies!');
        console.error('Error loading trending movies:', error);
    }
}

// Fetch Movie Details
async function fetchMovieDetails(movieId) {
    const url = `${BASE_URL}${MOVIE_DETAILS_ENDPOINT}${movieId}?api_key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

// Open Modal with Movie Details
async function openModal(movieId) {
    try {
        showLoader();
        const movie = await fetchMovieDetails(movieId);
        hideLoader();

        // Populate modal with movie details
        document.getElementById('modalTitle').textContent = movie.title;
        document.getElementById('modalDate').textContent = movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : 'N/A';
        document.getElementById('modalRating').textContent = movie.vote_average
            ? movie.vote_average.toFixed(1)
            : 'N/A';
        document.getElementById('modalRuntime').textContent = movie.runtime
            ? `${movie.runtime} min`
            : 'N/A';
        document.getElementById('modalOverview').textContent = movie.overview || 'No overview available.';
        document.getElementById('modalLanguage').textContent = movie.original_language
            ? movie.original_language.toUpperCase()
            : 'N/A';
        document.getElementById('modalPopularity').textContent = movie.popularity
            ? movie.popularity.toFixed(0)
            : 'N/A';

        // Set poster
        const modalPoster = document.getElementById('modalPoster');
        if (movie.poster_path) {
            modalPoster.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
            modalPoster.alt = movie.title;
        } else {
            modalPoster.src = '';
            modalPoster.alt = 'No poster available';
        }

        // Set genres
        const genresContainer = document.getElementById('modalGenres');
        genresContainer.innerHTML = '';
        if (movie.genres && movie.genres.length > 0) {
            movie.genres.forEach(genre => {
                const genreTag = document.createElement('span');
                genreTag.className = 'genre-tag';
                genreTag.textContent = genre.name;
                genresContainer.appendChild(genreTag);
            });
        }

        // Show modal
        movieModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

    } catch (error) {
        hideLoader();
        showMessage('❌ Failed to load movie details. Please try again.', 'error');
        console.error('Error fetching movie details:', error);
    }
}

// Close Modal
function closeModal() {
    movieModal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Set Active Navigation Item
function setActiveNav(index) {
    navItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

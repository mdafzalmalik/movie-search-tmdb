# 🎬 Movie Search App

A modern, responsive movie search application built with pure HTML, CSS, and Vanilla JavaScript using the TMDB API.

## ✨ Features

- 🔍 Real-time movie search using TMDB API
- 🎨 Modern dark theme (Netflix-style design)
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations and hover effects
- 💾 LocalStorage for last search
- 🔄 Loading spinner
- ❌ Error handling
- 🖼️ High-quality movie posters

## 🚀 Getting Started

### 1. Get TMDB API Key

1. Visit [TMDB Website](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key (it's free!)
5. Copy your API key

### 2. Setup

1. Open `script.js`
2. Replace `YOUR_TMDB_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

### 3. Run the App

Simply open `index.html` in your web browser!

## 📁 File Structure

```
movie-app/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## 🎯 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations
- **Vanilla JavaScript** - Fetch API, Async/Await
- **TMDB API** - Movie data

## 🌟 Features Breakdown

### UI/UX
- Dark theme with gradient accents
- Smooth card hover animations
- Responsive grid layout
- Modern typography (Poppins font)
- Loading spinner during API calls

### Functionality
- Search movies by title
- Display poster, title, release year, and rating
- Handle empty searches
- Handle API errors
- Handle no results found
- Enter key triggers search
- LocalStorage saves last search

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## 🎨 Color Scheme

- Background: `#0d0d0d`
- Card Background: `#1a1a1a`
- Accent Color: `#e50914` (Netflix red)
- Text Primary: `#ffffff`
- Text Secondary: `#b3b3b3`

## 📝 License

Free to use for personal and educational purposes.

## 🙏 Credits

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Font: [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)

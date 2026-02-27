# JAS Movies

A movie browsing web application built with React and Vite. Browse, search, filter, and manage your personal movie lists — then download them as PDFs.

---

## Team Members

- Sebastian Rodriguez
- Jose Araya
- Annika Maringer

---

## Features

- **Movie Catalog** — Displays a grid of movies loaded from a local JSON file, each showing the poster, title, director, IMDB rating (as stars), genre, year, age rating, and language.
- **Search** — Filter movies by title or director name in real time.
- **Filters** — Narrow results by genre, age group (G, PG, PG-13, R, NC-17), and release year.
- **Sorting** — Sort movies by year (newest/oldest), IMDB rating (high/low), or title (A→Z / Z→A).
- **Watchlist** — Add or remove movies from a personal Watchlist using the heart icon on each card. The list persists across page reloads via `localStorage`.
- **Already Watched** — Mark movies as watched using the eye icon. Also persists via `localStorage`.
- **PDF Download** — Download either list (Watchlist or Already Watched) as a formatted PDF file directly from the side drawer.
- **Pagination** — Movies are displayed 12 per page. Filters and sorting reset to page 1 automatically.
- **Toast Notifications** — Feedback messages appear when adding/removing movies or when no results match the current filters.
- **Loading Screen** — An animated loader is shown for at least 2 seconds while movie data is being fetched.
- **Responsive Design** — Layout adapts from 1 to 4 columns depending on screen size.

---

## How It Works

1. On load, the app fetches movie data from `/public/movie.json`.
2. The `SearchBar` component provides a text input and four dropdowns (genre, age group, year, sort order).
3. Filtering and sorting are computed with `useMemo` so the UI stays responsive.
4. Each `MovieCard` shows the movie poster as a background image with a gradient overlay. Hovering reveals the short description, runtime, and budget.
5. Clicking the heart button toggles a movie in the **Watchlist**; clicking the eye button toggles it in **Already Watched**.
6. Both lists are accessible via the icons in the **Navbar**. Each opens a side drawer listing the saved movies with a Remove button and a Download List button.
7. The Download button uses `@react-pdf/renderer` to generate and download a PDF with the movie title, year, genre, IMDB rating, and runtime for each entry.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mini-project-04

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Top bar with Watchlist and Watched drawers, PDF download
│   ├── MovieCard.jsx     # Individual movie card with poster, rating, and action buttons
│   ├── SearchBar.jsx     # Search input and filter/sort dropdowns
│   ├── Pagination.jsx    # Page navigation controls
│   ├── DownloadList.jsx  # PDF document template
│   ├── loader.jsx        # Loading animation
│   └── footer.jsx        # Footer with links and social icons
├── App.jsx               # Root component — state management and layout
├── main.jsx              # React entry point
└── index.css             # Global styles
public/
└── movie.json            # Movie dataset
```

---

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [DaisyUI Documentation](https://daisyui.com/)
- [Styled Components Documentation](https://styled-components.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [@react-pdf/renderer](https://react-pdf.org/)
- [Claude by Anthropic](https://claude.ai) — used to assist with Git and GitHub workflows
- [UIverse](https://uiverse.io/LightAndy1/tidy-pig-67)
- [UIverse](https://uiverse.io/Uncannypotato69/ancient-hound-67)

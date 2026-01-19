# Spotify Artist Compare

A Spotify-styled web application that lets you search and select up to 5 artists to compare side by side. View each artist's stats, popular tracks, releases, and see how they rank against each other by follower count.

## Features

- **Search Artists**: Search for any artist on Spotify
- **Select Up to 5 Artists**: Build your comparison list
- **Artist Pages**: Navigate between artists using large arrow buttons
- **Ranking System**: See how each artist ranks against the others by followers
- **Popular Tracks**: View top 10 tracks with play counts
- **Popular Releases**: Browse albums and singles with cover art
- **Image Carousel**: Auto-cycling artist images
- **Share Button**: Copy artist link to share

## Setup

### 1. Create a Spotify Developer App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app name and description
5. Note down your **Client ID** and **Client Secret**

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Spotify Web API** - Data source
- **CSS** - Spotify-inspired dark theme styling

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx         # Search input with debouncing
│   ├── SearchResults.jsx     # Grid of search results
│   ├── ArtistCard.jsx        # Selectable artist card
│   ├── ArtistPage.jsx        # Full artist detail page
│   ├── Navigation.jsx        # Arrow navigation between artists
│   ├── PopularTracks.jsx     # Top tracks list
│   ├── ImageCarousel.jsx     # Auto-cycling artist images
│   ├── AboutSection.jsx      # Artist stats and info
│   ├── PopularReleases.jsx   # Albums/singles grid
│   ├── ShareButton.jsx       # Share/copy link button
│   ├── RankingBadge.jsx      # Follower ranking display
│   ├── SelectedArtistsBar.jsx # Bottom bar showing selections
│   └── SearchPage.jsx        # Main search page
├── context/
│   └── ArtistContext.jsx     # Global state for selected artists
├── services/
│   └── spotify.js            # Spotify API integration
├── styles/
│   └── spotify-theme.css     # All styling
├── App.jsx                   # Main app component
└── main.jsx                  # Entry point
```

## Notes

- The Spotify Web API with Client Credentials does not expose monthly listeners directly, so the app uses **follower count** for ranking instead.
- All API calls are made client-side. For production use, consider adding a backend proxy to protect your credentials.

## License

MIT

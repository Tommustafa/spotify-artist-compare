import { useArtists } from '../context/ArtistContext';

export default function Navigation({ onBackToSearch }) {
  const { goToPrevious, goToNext, currentIndex, selectedArtists, goToIndex } = useArtists();

  return (
    <div className="navigation">
      <button 
        className="back-to-search"
        onClick={onBackToSearch}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Search
      </button>

      <div className="nav-controls">
        <button 
          className="nav-arrow nav-prev"
          onClick={goToPrevious}
          aria-label="Previous artist"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <div className="nav-dots">
          {selectedArtists.map((artist, index) => (
            <button
              key={artist.id}
              className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to ${artist.name}`}
              title={artist.name}
            />
          ))}
        </div>

        <button 
          className="nav-arrow nav-next"
          onClick={goToNext}
          aria-label="Next artist"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>

      <div className="nav-position">
        {currentIndex + 1} of {selectedArtists.length}
      </div>
    </div>
  );
}

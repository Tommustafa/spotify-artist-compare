import { useArtists } from '../context/ArtistContext';

export default function SelectedArtistsBar({ onViewArtists }) {
  const { selectedArtists, removeArtist, clearArtists } = useArtists();

  if (selectedArtists.length === 0) {
    return null;
  }

  return (
    <div className="selected-artists-bar">
      <div className="selected-artists-info">
        <span className="selected-count">
          {selectedArtists.length}/5 artists selected
        </span>
        <div className="selected-artists-list">
          {selectedArtists.map((artist) => (
            <div key={artist.id} className="selected-artist-chip">
              <img 
                src={artist.images?.[0]?.url || ''} 
                alt={artist.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span>{artist.name}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeArtist(artist.id);
                }}
                className="remove-chip"
                aria-label={`Remove ${artist.name}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="selected-artists-actions">
        <button 
          className="clear-all-button"
          onClick={clearArtists}
        >
          Clear All
        </button>
        <button 
          className="view-artists-button"
          onClick={onViewArtists}
          disabled={selectedArtists.length === 0}
        >
          View Artists
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

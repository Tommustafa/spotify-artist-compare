import { useArtists } from '../context/ArtistContext';
import { formatFollowers } from '../services/spotify';

export default function ArtistCard({ artist }) {
  const { addArtist, removeArtist, isArtistSelected, canAddMore } = useArtists();
  
  const isSelected = isArtistSelected(artist.id);
  const imageUrl = artist.images?.[0]?.url || '/placeholder-artist.png';
  const followers = artist.followers?.total || 0;

  const handleClick = () => {
    if (isSelected) {
      removeArtist(artist.id);
    } else if (canAddMore) {
      addArtist(artist);
    }
  };

  return (
    <div 
      className={`artist-card ${isSelected ? 'selected' : ''} ${!canAddMore && !isSelected ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      <div className="artist-card-image">
        <img 
          src={imageUrl} 
          alt={artist.name}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23282828" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%23b3b3b3" font-size="40">?</text></svg>';
          }}
        />
        {isSelected && (
          <div className="selected-overlay">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        )}
      </div>
      <div className="artist-card-info">
        <h3 className="artist-card-name">{artist.name}</h3>
        <p className="artist-card-followers">
          {formatFollowers(followers)} followers
        </p>
      </div>
      <button 
        className={`select-button ${isSelected ? 'selected' : ''}`}
        disabled={!canAddMore && !isSelected}
      >
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}

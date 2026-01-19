import { formatFollowers } from '../services/spotify';
import RankingBadge from './RankingBadge';
import ImageCarousel from './ImageCarousel';

export default function AboutSection({ artist }) {
  const followers = artist.followers?.total || 0;
  const genres = artist.genres || [];
  const popularity = artist.popularity || 0;

  return (
    <div className="about-section">
      <div className="about-image">
        <ImageCarousel images={artist.images} />
      </div>
      
      <div className="about-info">
        <div className="about-header">
          <RankingBadge artistId={artist.id} />
          <span className="verified-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            Verified Artist
          </span>
        </div>

        <h1 className="artist-name">{artist.name}</h1>
        
        <div className="artist-stats">
          <div className="stat">
            <span className="stat-value">{formatFollowers(followers)}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-value">{popularity}%</span>
            <span className="stat-label">Popularity</span>
          </div>
        </div>

        {genres.length > 0 && (
          <div className="artist-genres">
            {genres.slice(0, 4).map((genre) => (
              <span key={genre} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

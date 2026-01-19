import { formatPlayCount } from '../services/spotify';

export default function PopularTracks({ tracks }) {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="popular-tracks">
        <h2>Popular Tracks</h2>
        <p className="no-data">No tracks available</p>
      </div>
    );
  }

  return (
    <div className="popular-tracks">
      <h2>Popular Tracks</h2>
      <div className="tracks-list">
        {tracks.slice(0, 10).map((track, index) => (
          <div key={track.id} className="track-item">
            <span className="track-number">{index + 1}</span>
            <img 
              src={track.album?.images?.[2]?.url || track.album?.images?.[0]?.url} 
              alt={track.album?.name}
              className="track-album-art"
            />
            <div className="track-info">
              <span className="track-name">{track.name}</span>
              <span className="track-album">{track.album?.name}</span>
            </div>
            <span className="track-plays">
              {formatPlayCount(track.popularity * 10000)} plays
            </span>
            <span className="track-duration">
              {formatDuration(track.duration_ms)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

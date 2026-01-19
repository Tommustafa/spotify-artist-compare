export default function PopularReleases({ albums }) {
  if (!albums || albums.length === 0) {
    return (
      <div className="popular-releases">
        <h2>Popular Releases</h2>
        <p className="no-data">No releases available</p>
      </div>
    );
  }

  return (
    <div className="popular-releases">
      <h2>Popular Releases</h2>
      <div className="releases-grid">
        {albums.map((album) => (
          <a 
            key={album.id} 
            href={album.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="release-card"
          >
            <div className="release-image">
              <img 
                src={album.images?.[0]?.url || album.images?.[1]?.url} 
                alt={album.name}
              />
              <div className="play-overlay">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="release-info">
              <h3 className="release-name">{album.name}</h3>
              <p className="release-meta">
                {album.release_date?.substring(0, 4)} • {capitalizeFirst(album.album_type)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

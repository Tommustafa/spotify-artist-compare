import ArtistCard from './ArtistCard';

export default function SearchResults({ results, loading, error }) {
  if (loading) {
    return (
      <div className="search-results">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">
          <p>Search for artists to compare</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="results-grid">
        {results.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

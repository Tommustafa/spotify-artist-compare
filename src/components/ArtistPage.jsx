import { useEffect, useState } from 'react';
import { useArtists } from '../context/ArtistContext';
import { getArtistTopTracks, getArtistAlbums } from '../services/spotify';
import AboutSection from './AboutSection';
import PopularTracks from './PopularTracks';
import PopularReleases from './PopularReleases';
import ShareButton from './ShareButton';
import Navigation from './Navigation';

export default function ArtistPage({ onBackToSearch }) {
  const { currentArtist, artistDetails, setArtistData } = useArtists();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentArtist) return;

    // Check if we already have the data
    if (artistDetails[currentArtist.id]) return;

    const fetchArtistData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [tracks, albums] = await Promise.all([
          getArtistTopTracks(currentArtist.id),
          getArtistAlbums(currentArtist.id),
        ]);

        setArtistData(currentArtist.id, { tracks, albums });
      } catch (err) {
        console.error('Failed to fetch artist data:', err);
        setError('Failed to load artist details');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [currentArtist, artistDetails, setArtistData]);

  if (!currentArtist) {
    return (
      <div className="artist-page">
        <Navigation onBackToSearch={onBackToSearch} />
        <div className="artist-page-content">
          <p>No artist selected</p>
        </div>
      </div>
    );
  }

  const details = artistDetails[currentArtist.id] || {};

  return (
    <div className="artist-page">
      <Navigation onBackToSearch={onBackToSearch} />
      
      <div className="artist-page-content">
        <div className="artist-page-header">
          <AboutSection artist={currentArtist} />
          <ShareButton artist={currentArtist} />
        </div>

        {loading && (
          <div className="loading-section">
            <div className="spinner"></div>
            <p>Loading artist details...</p>
          </div>
        )}

        {error && (
          <div className="error-section">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <PopularTracks tracks={details.tracks} />
            <PopularReleases albums={details.albums} />
          </>
        )}

        <a 
          href={currentArtist.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="open-spotify-button"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Open in Spotify
        </a>
      </div>
    </div>
  );
}

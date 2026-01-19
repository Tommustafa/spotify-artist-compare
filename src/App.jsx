import { useState } from 'react';
import { ArtistProvider, useArtists } from './context/ArtistContext';
import SearchPage from './components/SearchPage';
import ArtistPage from './components/ArtistPage';

function AppContent() {
  const [view, setView] = useState('search'); // 'search' or 'artists'
  const { selectedArtists } = useArtists();

  const handleViewArtists = () => {
    if (selectedArtists.length > 0) {
      setView('artists');
    }
  };

  const handleBackToSearch = () => {
    setView('search');
  };

  return (
    <div className="app">
      {view === 'search' ? (
        <SearchPage onViewArtists={handleViewArtists} />
      ) : (
        <ArtistPage onBackToSearch={handleBackToSearch} />
      )}
    </div>
  );
}

function App() {
  return (
    <ArtistProvider>
      <AppContent />
    </ArtistProvider>
  );
}

export default App;

import { createContext, useContext, useState, useCallback } from 'react';

const ArtistContext = createContext(null);

export function ArtistProvider({ children }) {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artistDetails, setArtistDetails] = useState({});

  const addArtist = useCallback((artist) => {
    setSelectedArtists((prev) => {
      if (prev.length >= 5) return prev;
      if (prev.find((a) => a.id === artist.id)) return prev;
      return [...prev, artist];
    });
  }, []);

  const removeArtist = useCallback((artistId) => {
    setSelectedArtists((prev) => prev.filter((a) => a.id !== artistId));
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const clearArtists = useCallback(() => {
    setSelectedArtists([]);
    setArtistDetails({});
    setCurrentIndex(0);
  }, []);

  const setArtistData = useCallback((artistId, data) => {
    setArtistDetails((prev) => ({
      ...prev,
      [artistId]: data,
    }));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => 
      prev >= selectedArtists.length - 1 ? 0 : prev + 1
    );
  }, [selectedArtists.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => 
      prev <= 0 ? selectedArtists.length - 1 : prev - 1
    );
  }, [selectedArtists.length]);

  const goToIndex = useCallback((index) => {
    if (index >= 0 && index < selectedArtists.length) {
      setCurrentIndex(index);
    }
  }, [selectedArtists.length]);

  // Calculate rankings based on followers
  const getRankings = useCallback(() => {
    const sorted = [...selectedArtists].sort(
      (a, b) => (b.followers?.total || 0) - (a.followers?.total || 0)
    );
    
    const rankings = {};
    sorted.forEach((artist, index) => {
      rankings[artist.id] = index + 1;
    });
    
    return rankings;
  }, [selectedArtists]);

  // Get follower comparison for a specific artist vs all others
  const getFollowerComparison = useCallback((artistId) => {
    const currentArtist = selectedArtists.find(a => a.id === artistId);
    if (!currentArtist) return [];

    const currentFollowers = currentArtist.followers?.total || 0;
    
    return selectedArtists
      .filter(a => a.id !== artistId)
      .map(artist => ({
        artistId: artist.id,
        artistName: artist.name,
        artistFollowers: artist.followers?.total || 0,
        difference: currentFollowers - (artist.followers?.total || 0)
      }))
      .sort((a, b) => b.difference - a.difference);
  }, [selectedArtists]);

  const value = {
    selectedArtists,
    currentIndex,
    artistDetails,
    addArtist,
    removeArtist,
    clearArtists,
    setArtistData,
    goToNext,
    goToPrevious,
    goToIndex,
    getRankings,
    getFollowerComparison,
    currentArtist: selectedArtists[currentIndex] || null,
    canAddMore: selectedArtists.length < 5,
    isArtistSelected: (id) => selectedArtists.some((a) => a.id === id),
  };

  return (
    <ArtistContext.Provider value={value}>
      {children}
    </ArtistContext.Provider>
  );
}

export function useArtists() {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error('useArtists must be used within an ArtistProvider');
  }
  return context;
}

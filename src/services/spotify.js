const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// Use different URLs for local dev vs production
const isProduction = import.meta.env.PROD;

let accessToken = null;
let tokenExpiry = null;

// Get access token using Client Credentials flow
export async function getAccessToken() {
  // Return cached token if still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  let response;
  
  if (isProduction) {
    // In production, the serverless function handles credentials
    response = await fetch('/api/token', {
      method: 'POST',
    });
  } else {
    // In development, send credentials through proxy
    const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    response = await fetch('/auth/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
  }

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  accessToken = data.access_token;
  // Set expiry 5 minutes before actual expiry to be safe
  tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
  
  return accessToken;
}

// Make authenticated API request
async function apiRequest(url) {
  const token = await getAccessToken();
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

// Search for artists
export async function searchArtists(query) {
  if (!query.trim()) return [];
  
  if (isProduction) {
    const data = await apiRequest(`/api/search?q=${encodeURIComponent(query)}`);
    return data.artists.items;
  } else {
    const data = await apiRequest(`/spotify/search?q=${encodeURIComponent(query)}&type=artist&limit=20`);
    return data.artists.items;
  }
}

// Get artist details
export async function getArtist(artistId) {
  if (isProduction) {
    return apiRequest(`/api/artists?id=${artistId}`);
  } else {
    return apiRequest(`/spotify/artists/${artistId}`);
  }
}

// Get artist's top tracks
export async function getArtistTopTracks(artistId, market = 'US') {
  if (isProduction) {
    const data = await apiRequest(`/api/top-tracks?id=${artistId}&market=${market}`);
    return data.tracks;
  } else {
    const data = await apiRequest(`/spotify/artists/${artistId}/top-tracks?market=${market}`);
    return data.tracks;
  }
}

// Get artist's albums
export async function getArtistAlbums(artistId, limit = 10) {
  if (isProduction) {
    const data = await apiRequest(`/api/albums?id=${artistId}&limit=${limit}`);
    return data.items;
  } else {
    const data = await apiRequest(`/spotify/artists/${artistId}/albums?include_groups=album,single&limit=${limit}`);
    return data.items;
  }
}

// Get multiple artists at once
export async function getMultipleArtists(artistIds) {
  if (artistIds.length === 0) return [];
  
  if (isProduction) {
    const data = await apiRequest(`/api/artists?ids=${artistIds.join(',')}`);
    return data.artists;
  } else {
    const data = await apiRequest(`/spotify/artists?ids=${artistIds.join(',')}`);
    return data.artists;
  }
}

// Format play count with commas
export function formatPlayCount(count) {
  if (!count) return '0';
  return count.toLocaleString();
}

// Format followers count with abbreviations
export function formatFollowers(count) {
  if (!count) return '0';
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toLocaleString();
}

export default async function handler(req, res) {
  const { path } = req.query;
  const spotifyPath = Array.isArray(path) ? path.join('/') : path;
  
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  try {
    // Build the full Spotify API URL with query parameters
    const url = new URL(`https://api.spotify.com/v1/${spotifyPath}`);
    
    // Forward query parameters (except 'path' which is our routing param)
    Object.entries(req.query).forEach(([key, value]) => {
      if (key !== 'path') {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).send(error);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to proxy request' });
  }
}

export default async function handler(req, res) {
  const { id, ids } = req.query;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  try {
    let url;
    if (ids) {
      url = `https://api.spotify.com/v1/artists?ids=${ids}`;
    } else if (id) {
      url = `https://api.spotify.com/v1/artists/${id}`;
    } else {
      return res.status(400).json({ error: 'Missing id or ids parameter' });
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).send(error);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get artist' });
  }
}

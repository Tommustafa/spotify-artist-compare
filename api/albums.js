export default async function handler(req, res) {
  const { id, limit = '10' } = req.query;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  if (!id) {
    return res.status(400).json({ error: 'Missing artist id' });
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=${limit}`,
      {
        headers: {
          'Authorization': authHeader,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).send(error);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get albums' });
  }
}

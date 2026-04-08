export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const response = await fetch(
      `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await response.json();

    // مهم جدًا
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // debug مهم
    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    return res.status(200).json(data.organic_results || []);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

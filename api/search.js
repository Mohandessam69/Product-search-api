export default async function handler(req, res) {
  const { query } = req.query;

  // تحقق إن فيه query
  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const response = await fetch(
      `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await response.json();

    // CORS عشان Shopify
    res.setHeader('Access-Control-Allow-Origin', '*');

    // نرجع results بشكل بسيط
    const results = (data.organic_results || []).map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      source: item.displayed_link
    }));

    res.status(200).json(results);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

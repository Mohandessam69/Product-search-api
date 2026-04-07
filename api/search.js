export default async function handler(req, res) {
  const query = req.query.query;

  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await response.json();

    // 🔥 مهم جدًا: رجّع JSON بسيط
    const results = data.shopping_results || [];

    return res.status(200).json(results);

  } catch (error) {
    return res.status(500).json({ error: "error" });
  }
}

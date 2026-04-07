export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await response.json();

    // 🔥 CORS FIX كامل
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

    // 👇 مهم جدًا
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    res.status(200).json(data.shopping_results || []);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

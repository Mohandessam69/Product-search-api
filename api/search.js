export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await response.json();

    // 🔥 أهم سطرين (حل المشكلة)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    res.status(200).json(data.shopping_results || []);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

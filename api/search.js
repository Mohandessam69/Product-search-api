export default async function handler(req, res) {
  try {
    // 🔥 دعم Shopify Proxy
    const query = req.query.query || req.query.q || "iphone";

    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await response.json();

    return res.status(200).json(data.shopping_results || []);

  } catch (error) {
    return res.status(200).json([]); // 🔥 مهم جدًا
  }
}

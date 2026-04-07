export default async function handler(req, res) {

  const query = req.query.query || "";

  if (!query) {
    return res.status(200).json([]);
  }

  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${query}&api_key=YOUR_API_KEY`
    );

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    return res.status(200).json(data.shopping_results || []);

  } catch (error) {
    return res.status(200).json([]);
  }
}

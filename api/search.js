export default async function handler(req, res) {

  const url = new URL(req.url, `http://${req.headers.host}`);
  const query = url.searchParams.get("query") || "";

  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${query}&api_key=YOUR_API_KEY`
    );

    const data = await response.json();

    res.setHeader("Content-Type", "application/json");

    return res.status(200).json(data.shopping_results || []);

  } catch {
    return res.status(200).json([]);
  }
}

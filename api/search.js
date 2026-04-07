export default async function handler(req, res) {

  // ✅ حل مشكلة CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "No query" });
  }

  try {
    const response = await fetch(
      `https://serpapi.com/search.json?q=${query}&engine=google`
    );

    const data = await response.json();

    const products = data.shopping_results || [];

    const result = products.map(p => ({
      title: p.title,
      price: p.price,
      link: p.product_link,
      thumbnail: p.thumbnail
    }));

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ error: "API error" });
  }
}

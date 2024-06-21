// import axios from "axios";
// import express from "express";
// import cors from "cors";

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors()); // Enable CORS for cross-origin requests
// app.use(express.json()); // Parse JSON bodies

// // Endpoint to fetch article data
// app.post("/api/article", async (req, res) => {
//   try {
//     const { articleUrl } = req.body;

//     if (!articleUrl) {
//       return res.status(400).json({ error: "Article URL is required" });
//     }

//     // Example of fetching article data from an external source
//     const response = await axios.get(articleUrl);

//     // Verify the structure of response.data and adjust accordingly
//     const article = {
//       // author: response.data?.author || null,
//       // content: response.data?.content || "",
//       // description: response.data?.description || "",
//       // publishedAt: response.data?.publishedAt || "",
//       // source: {
//       //   id: response.data?.source?.id || "",
//       //   name: response.data?.source?.name || "",
//       // },
//       // title: response.data?.title || "",
//       url: response.data?.url || "",
//       // urlToImage: response.data?.urlToImage || "",
//     };

//     res.status(200).json({ status: "ok", article });
//   } catch (error) {
//     console.error("Error fetching article:", error);
//     res.status(500).json({ error: "Failed to fetch article" });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

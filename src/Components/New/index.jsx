// import axios  from 'axios';
// import express from 'express'
// import cheerio from 'cheerio'

// var app = express();

// // API endpoint to fetch article data
// app.get('/api/article', async (req, res) => {
//     try {
//         const articleUrl = `https://www.bbc.com/news/articles/c7227d0nl20o`; // URL of the article to fetch
//         const response = await axios.get(articleUrl);
//         const html = response.data;
//         const $ = cheerio.load(html);

//         // Extract relevant data
//         const title = $('h1').text().trim();
//         const description = $('meta[name="description"]').attr('content');
//         const author = $('meta[name="author"]').attr('content');
//         const datePublished = $('meta[name="dcterms.date"]').attr('content');
//         const mainContent = $('article').text().trim(); // Adjust selector as per HTML structure

//         // Return the extracted data as JSON response
//         res.json({
//             title,
//             description,
//             author,
//             datePublished,
//             mainContent
//         });
//     } catch (error) {
//         console.error('Error fetching article:', error);
//         res.status(500).json({ error: 'Failed to fetch article' });
//     }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

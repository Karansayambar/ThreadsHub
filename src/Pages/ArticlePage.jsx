import React from 'react';
import { useLocation } from 'react-router-dom';

const ArticlePage = () => {
  const { state } = useLocation();
  const articleData = state?.articleData;

  if (!articleData) {
    return <p>No article data available.</p>;
  }

  // Example of formatting date (assuming articleData.publishedAt is in ISO format)
  const formattedDate = new Date(articleData.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ background: 'red' }}>
      <h1>{articleData.url}</h1>
      <p>{articleData.author}</p>
      <p>{formattedDate}</p>
      <p>{articleData.description}</p>
      {/* Replace with your specific content structure */}
      {/* <div>{articleData.url}</div> */}
    </div>
  );
};

export default ArticlePage;

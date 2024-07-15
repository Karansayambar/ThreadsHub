import { createContext, useState } from 'react';
export const CategoryContext = createContext();

// Provider component to wrap around the parts of the app that need access to the context
export const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState('General');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [like, setLike] = useState(0);
    // State to store the list of liked articles, initialized from session storage if available...
    const [likedArticles, setLikedArticles] = useState(JSON.parse(sessionStorage.getItem('likedArticles')) || []);
    // Function to toggle the like status of an article.
    const toggleLike = (article) => {
        // Check if the article is already liked
        const updatedLikedArticles = likedArticles.some(item => item.id === article.id)
            ? likedArticles.filter(item => item.id !== article.id)  // Remove if already liked
            : [...likedArticles, article];  // Add if not liked

        // Update the state with the new list of liked articles
        setLikedArticles(updatedLikedArticles);
        // Save the updated list to session storage
        sessionStorage.setItem('likedArticles', JSON.stringify(updatedLikedArticles));
        // Update the like count
        setLike(updatedLikedArticles.length);
    };


    // Provide the context values to the children components
    return (
        <CategoryContext.Provider value={{ category, setCategory, page, setPage, search, setSearch, like, setLike, likedArticles, toggleLike }}>
            {children}
        </CategoryContext.Provider>
    );
};

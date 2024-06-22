import { createContext, useState } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [like, setLike] = useState(0);
    const [likedArticles, setLikedArticles] = useState(JSON.parse(sessionStorage.getItem('likedArticles')) || []);

    const toggleLike = (article) => {
        const updatedLikedArticles = likedArticles.some(item => item.url === article.url)
            ? likedArticles.filter(item => item.url !== article.url)
            : [...likedArticles, article];

        setLikedArticles(updatedLikedArticles);
        sessionStorage.setItem('likedArticles', JSON.stringify(updatedLikedArticles));
        setLike(updatedLikedArticles.length);
    };

    return (
        <CategoryContext.Provider value={{ category, setCategory, page, setPage, search, setSearch, like, setLike, likedArticles, toggleLike }}>
            {children}
        </CategoryContext.Provider>
    );
};

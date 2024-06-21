import axios from "axios";
import { useContext, useEffect, useState } from "react";
import './style.css';
import useCheckMobileScreen from "../../Functions/useCheckMobileScreen";
import { CategoryContext } from "../../Context/CategoryContext";
import { TimeConverter } from "../../Functions/useTimeConverter";
import MobileLoader from "../../Functions/useMobileLoader";
import DesktopLoader from "../../Functions/useDesktopLoader";
import Pagination from "../Pagination";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search";

const MainPage = () => {
    const { category, page, search, setSearch } = useContext(CategoryContext);
    const [data, setData] = useState(null);
    const [articles, setArticles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = useCheckMobileScreen();
    const [searchToggle, setSearchToggle] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                 // const key = "1436c2c4dbc348e1b92cbc2c5010d5a1";
//                 // const key = "386d133d7ed649ff9d4074e5b198a729";
                setIsLoading(true);
                const key = "589b61a2a62040e6b08d585c3709a08e"; // Replace with your actual API key
                let url = '';

                if (search) {
                    url = `https://newsapi.org/v2/everything?q=${search}&apiKey=${key}`;
                } else if (category) {
                    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`;
                }

                const response = await axios.get(url);
                setArticles(response.data.articles);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        getData();
    }, [category, search]);


// useEffect(() => {
//         const getData = async () => {
//             try {
//                 setIsLoading(true);
//                 const key = "iOw9-O0NNH9cWzAZZDKp8b-ZhvnWOeBGkZgBDz1tmfS_tGAM"; // Your API Key
//                 let url = '';

//                 if (search) {
//                     // Fetch based on search keyword
//                     url = `https://api.currentsapi.services/v1/search?keywords=${search}&language=en&apiKey=${key}`;
//                 } else if (category) {
//                     // Fetch based on category
//                     url = `https://api.currentsapi.services/v1/latest-news?category=${category}&language=en&apiKey=${key}`;
//                 } else {
//                     // Fetch latest news if no search or category is provided
//                     url = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${key}`;
//                 }

//                 const response = await axios.get(url);
//                 setArticles(response.data.news);
//                 console.log("Your data:", response.data.news);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setIsLoading(false);
//             }
//         };
//         getData();
//     }, [category, search]);



    // const handleFetchArticle = async (articleUrl) => {
    //     try {
    //         const response = await axios.post('http://localhost:5000/', { articleUrl });
    //         const { article } = response.data;
    //         navigate('/article', { state: { articleData: article } });
    //     } catch (error) {
    //         console.error('Error fetching article data:', error);
    //     }
    // };

    return (
        <>
            <div className="search-container">
                {!searchToggle && <h1 className="head">Top Headlines in {category}</h1>}
                {isMobile && (
                    <div className='search' onClick={() => setSearchToggle(true)}>
                        {searchToggle ? <Search /> : <><p><IoSearchSharp className='search-logo' /></p></>}
                    </div>
                )}
            </div>
            <div className="article-container">
                {isLoading ? (
                    !isMobile ? (
                        <div className="loader-container">
                            {[...Array(6)].map((_, index) => (<DesktopLoader key={index} />))}
                        </div>
                    ) : (
                        <div>
                            {[...Array(6)].map((_, index) => (<MobileLoader key={index} />))}
                        </div>
                    )
                ) : articles && articles.length > 0 ? (
                    <>
                        {!isMobile ? (
                            articles.slice(page * 6 - 6, page * 6).map((article, index) => (
                                <div className="article" key={index}>
                                    <Link to={article.url} className="link">
                                    <div className="link">
                                        <h3 className="title">{article.title.slice(0, 80)}...</h3>
                                        <img className="img" src={article.urlToImage} alt={article.title} />
                                        <p className="description">{article.description ? article.description.slice(0, 100) + "..." : "No description available"}</p>
                                    </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            articles.slice(page * 7 - 7, page * 7).map((article, index) => (
                                <div className="article" key={index}>
                                    <div className="container">
                                        <img className="img" src={article.urlToImage} alt={article.title} />
                                        <div className="mini-container">
                                            <h3 className="title">{article.title.slice(0, 50)}...</h3>
                                            <p className="source">{article.source.name}</p>
                                            <p className="publish">{TimeConverter(article.publishedAt.slice(0, 10))}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                ) : (
                    <p>No data</p>
                )}
            </div>
            {articles && (
                <div className="page"><Pagination /></div>
            )}
        </>
    );
};

export default MainPage;



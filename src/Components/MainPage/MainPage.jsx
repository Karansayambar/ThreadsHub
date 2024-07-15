
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
import { AiOutlineLike } from "react-icons/ai";
import Search from "../Search";
import { Link } from "react-router-dom";

const MainPage = () => {
    const { category, page, search, like, setLike, likedArticles, toggleLike } = useContext(CategoryContext);   // Access data from useContext
    const [data, setData] = useState(null);
    var  [articles, setArticles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = useCheckMobileScreen();
    const [searchToggle, setSearchToggle] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const key = "iOw9-O0NNH9cWzAZZDKp8b-ZhvnWOeBGkZgBDz1tmfS_tGAM";
                let url = '';

                // Conditional rendering based on search and category
                if (search) {
                    // Fetch based on search keyword
                    url = `https://api.currentsapi.services/v1/search?keywords=${search}&language=en&apiKey=${key}`;
                } else if (category) {
                    // Fetch based on category
                    url = `https://api.currentsapi.services/v1/latest-news?category=${category}&language=en&apiKey=${key}`;
                } else {
                    // Fetch latest news if no search or category is provided
                    url = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${key}`;
                }

                // Data fetch using Axios
                const response = await axios.get(url);
                setArticles(response.data.news);
                console.log("Your data:", response.data.news);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        getData();
    }, [category, search]);

    return (
        <>
            <div className="search-container">
                {!searchToggle && 
                 <marquee className="marquee">
                    <div className="marquee-content">
                        <p>Nifty50 23,501.10</p>
                        <p style={{color:"red"}}>-65.90</p>
                        <p>Sunsex 77,209,90</p>
                        <p style={{color:"green"}}>+1.00</p>
                    </div>
                </marquee>}
                {isMobile && ( // Display only on Mobile view 
                    // Implemented search functionality user can search on any keyword
                    <div className='search' onClick={() => setSearchToggle(true)}>
                        {searchToggle ? <Search /> : <><p><IoSearchSharp className='search-logo' /></p></>}
                    </div>
                )}
            </div>
            <div className="article-container">
                { // Loading component render 
                isLoading ? (
                    !isMobile ? (  // Loading for Desktop view
                        <div className="loader-container">
                            {[...Array(6)].map((_, index) => (<DesktopLoader key={index} />))}
                        </div>
                    ) : (  // Loading for Mobile view
                        <div>
                            {[...Array(6)].map((_, index) => (<MobileLoader key={index} />))}
                        </div>
                    )
                ) : articles && articles.length > 0 ? (
                    <>
                        {!isMobile ? (  // Articles render in Desktop view
                            articles.slice(page * 9 - 9, page * 9).map((article, index) => (
                                <div className="article" key={index}>
                                    <div className="link">
                                        <Link to= {`/article/${article.id}`} state={{article : {article}}} className="link">
                                            <h3 className="title">{article.title.slice(0, 80)}...</h3>
                                        </Link>
                                        <img className="img" src={article.image} alt={article.title} />
                                        <p className="description">{article.description ? article.description.slice(0, 100) + "..." : "No description available"}</p>
                                        <div className="like-container">
                                            <p className="publish">{TimeConverter(article.published.slice(0, 10))}</p>
                                            <p className={likedArticles.some(item => item.id === article.id) ? "color-red" : ''} onClick={() => toggleLike(article)}>
                                                <AiOutlineLike />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (  // Articles render in Mobile view
                            articles.slice(page * 9 - 9, page * 9).map((article, index) => (
                                <div className="article" key={index}>
                                    <div className="container">
                                        <img className="img" src={article.image} alt={article.title} />
                                        <div className="mini-container">
                                            <Link to={article.url} className="link">
                                                <h3 className="title">{article.title.slice(0, 60)}...</h3>
                                            </Link>
                                            <div className="like-container">
                                                <p className="publish">{TimeConverter(article.published.slice(0, 10))}</p>
                                                <p className={likedArticles.some(item => item.url === article.url) ? "color-red" : ''} onClick={() => toggleLike(article)}>
                                                    <AiOutlineLike />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                ) : ( // If data is not present, show "No data"
                    <p>No data</p>
                )}
            </div>
            {articles && (  // Implemented pagination, access data from Pagination component
                <div className="page"><Pagination /></div>
            )}
        </>
    );
};

export default MainPage;


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
import { AiOutlineLike } from "react-icons/ai";
import Search from "../Search";

const MainPage = () => {
    const { category, page, search, like, setLike } = useContext(CategoryContext);
    const [data, setData] = useState(null);
    const [articles, setArticles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = useCheckMobileScreen();
    const [searchToggle, setSearchToggle] = useState(false);
    const [color, setColor] = useState(false);
    const [likedArticles, setLikedArticles] = useState([]);

    const navigate = useNavigate();

useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const key = "iOw9-O0NNH9cWzAZZDKp8b-ZhvnWOeBGkZgBDz1tmfS_tGAM"; // Your API Key
                let url = '';

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

    const toggleLike = (id) => {
        if(likedArticles.includes(id)){
            // Unlike article
            setLikedArticles(likedArticles.filter(item => item !== id));
            setLike(like - 1);
        }else {
            // Like article
            setLikedArticles([...likedArticles, id]);
            setLike(like + 1);
        }
    }


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
                            articles.slice(page * 9 - 9, page * 9).map((article, index) => (
                                <div className="article" key={index}>
                                    
                                    <div className="link">
                                       <Link to={article.url} className="link"> <h3 className="title">{article.title.slice(0, 80)}...</h3></Link>
                                        <img className="img" src={article.image} alt={article.title} />
                                        <p className="description">{article.description ? article.description.slice(0, 100) + "..." : "No description available"}</p>
                                        <div className="like-container">
                                        <p className="publish">{TimeConverter(article.published.slice(0, 10))}</p>
                                        <p className={likedArticles.includes(article.id) ? "color-red" : ''} onClick={() => toggleLike(article.id)}><AiOutlineLike/></p>
                                    </div>
                                    </div>
                                    
                                </div>
                            ))
                        ) : (
                            articles.slice(page * 9 - 9, page * 9).map((article, index) => (
                                <div className="article" key={index}>
                                    <div className="container">
                                        <img className="img" src={article.image} alt={article.title} />
                                        <div className="mini-container">
                                            <Link to={article.url} className="link"> <h3 className="title">{article.title.slice(0, 60)}...</h3></Link>
                                            {/* <p className="source">Auther: {article.author}</p> */}
                                            <div className="like-container">
                                                <p className="publish">{TimeConverter(article.published.slice(0, 10))}</p>
                                                <p className={likedArticles.includes(article.id) ? "color-red" : ''} onClick={() => toggleLike(article.id)}><AiOutlineLike/></p>
                                            </div>
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



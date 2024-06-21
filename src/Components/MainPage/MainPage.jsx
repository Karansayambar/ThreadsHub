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
import { useNavigate } from "react-router-dom";
import Search from "../Search";
// import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {

    const {category, page, search, setSearch } = useContext(CategoryContext);
    const [data, setData] = useState(null); // Initialize with null for better conditional checks
    const [articles, setArticles] = useState(null); // Initialize with null for better conditional checks
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = useCheckMobileScreen();
    const [searchToggle, setSearchToggle] = useState(false);
    const [error, setError] = useState(null);

    const navigate= useNavigate();

    console.log("ismobile", isMobile);



                // const key = "1436c2c4dbc348e1b92cbc2c5010d5a1";
                // const key = "386d133d7ed649ff9d4074e5b198a729";




useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const key = "386d133d7ed649ff9d4074e5b198a729"; // Replace with your actual API key
                let url = '';

                if (search) {
                    // Fetch based on search keyword
                    url = `https://newsapi.org/v2/everything?q=${search}&apiKey=${key}`;
                } else if (category) {
                    // Fetch based on category
                    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`;
                }

                const response = await axios.get(url);
                setArticles(response.data.articles);
                console.log("Your data:", response.data.articles);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        getData();
    }, [category, search]);







  const [articleData, setArticleData] = useState(null);


    // const handleFetchArticle = async (articleUrl) => {
    //     try {
    //         console.log("handle fetch funnction run")
    //         const response = await axios.post("http://localhost:5000/api/article", { articleUrl });
    //         const { article } = response.data;
    //         console.log("response data",response.data)
    //         // Redirect to article page with article data
    //         navigate('/article', { state: { articleData: article } });
    //     } catch (error) {
    //         console.error("Error fetching article data:", error);
    //         // Handle error if needed
    //     }
    // };
    return (
        <>
            <div className="search-container">
                {!searchToggle && <h1 className="head">Top Headlines in {category}</h1>}
                {isMobile && (
                <div className='search' onClick={()=> setSearchToggle(true)}>
                {searchToggle ? (
            <Search/>

) : (
                    <>
                    <p><IoSearchSharp className='search-logo'/></p>
                    </>
                )
                }
            </div>
            )}
            </div>
            <div className="article-container">
                {isLoading ? (
                    !isMobile ? (
                    <div className="loader-container">
                        {[...Array(7)].map((_,index) => (
                            <DesktopLoader key={index}/>
                        ))}
                    </div>
                ): (
                    <div>
                        {[...Array(7)].map((_, index) => (
                            <MobileLoader key={index}/>
                        ))}
                    </div>
                )
                ) : articles && articles.length > 0 ? (
                    <>
                        {!isMobile ? (
                            articles.slice(page * 7 - 7, page * 7).map((article, index) => (
                                    <div className="article" key={index}>
                                    <div className="link" onClick={() => handleFetchArticle(article.url)}>
                                        <h3 className="title">{article.title.slice(0, 80)}...</h3>
                                        <img className="img" src={article.urlToImage} alt={article.title} />
                                        <p className="description">
                                            {article.description ? article.description.slice(0, 100) + "..." : "No description available"}
                                        </p>
                                        {/* <a href={article.url}>hello</a> */}
                                    </div>
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
                                            <p className="publish">{TimeConverter(article.publishedAt.slice(0,10))}</p>
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
                <div className="page">
                    <Pagination/>
                </div>
            )}
        </>
    );
};

export default MainPage;



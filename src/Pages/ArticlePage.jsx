// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {useLocation, useParams } from 'react-router-dom';
// import Navbar from '../Components/Navbar';
// import { TimeConverter } from '../Functions/useTimeConverter';
// const ArticlePage = () => {
//     const {id} = useParams();

//     console.log("artical page", id);

//     // const [articles, setArticles] = useState([]);
//     const location = useLocation()
//     const {articles} = location.state || {};  // Destructure article from location.state
//     // const [isLoading, setIsLoading] = useState(true);
//     // const isMobile = useCheckMobileScreen();
//     console.log("articles data", articles);

//     // useEffect(() => {
//     //     const getData = async () => {
//     //         try {
//     //             setIsLoading(true);
//     //             const key = "iOw9-O0NNH9cWzAZZDKp8b-ZhvnWOeBGkZgBDz1tmfS_tGAM";
//     //             let url = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${key}`;

//     //             // Data fetch using Axios
//     //             const response = await axios.get(url);
//     //             setArticles(response.data.news);
//     //             console.log("Your data:", response.data.news);
//     //             setIsLoading(false);
//     //         } catch (error) {
//     //             console.error("Error fetching data:", error);
//     //             setIsLoading(false);
//     //         }
//     //     };
//     //     getData();
//     // }, [id]);

//     // const articleData = articles.find((item) => item.id === id);
//     // console.log("article details", articleData);

//     //   if (isLoading) {
//     //     return <div>Loading...</div>;
//     // }

//     if (!articles) {
//         return <div>Article not found</div>;
//     }

//     return (
//         <>
//         <Navbar/>
//         <div className='article-Container'>
//             <img src={articles.image}/>
//             <div>
//                 <h1>{articles.title}</h1>
//                 <p>{articles.description}</p>
//                 <span className='clip-1'>
//                     <p>Author : <strong>{articles.author}</strong></p>
//                     <p>Published At : <strong>{TimeConverter(articles.published.slice(0,10))}</strong></p>
//                 </span>
//             </div>
//         </div>
//         </>
        
//     );
// };

// export default ArticlePage;

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { TimeConverter } from '../Functions/useTimeConverter';
import { CategoryContext } from '../Context/CategoryContext';
import { AiOutlineLike } from 'react-icons/ai';

const ArticlePage = () => {
    const { id } = useParams();
    const location = useLocation();
   const { article } = location.state || {};  // Destructure article from location.state
   const [articleData, setArticleData] = useState({});

   const {toggleLike, likedArticles} = useContext(CategoryContext)

    console.log("article page", id);
    console.log("article details", article.article);

    useEffect(() => {
        if(article.article){
            setArticleData(article.article)
        }
    },[id])

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <>
           <Navbar/>
           <div className='article-Container'>
               <img src={articleData.image}/>
               <div className='article-details'>
                   <h1>{articleData.title}</h1>
                   <div>
                    <p>{articleData.description}</p>
                   <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, provident! Laborum debitis in, ullam eos asperiores repellendus, ratione expedita illum commodi aliquam porro! Voluptatum quam reprehenderit molestiae asperiores! Perferendis, asperiores.</p>                   
                   <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, provident! Laborum debitis in, ullam eos asperiores repellendus, ratione expedita illum commodi aliquam porro! Voluptatum quam reprehenderit molestiae asperiores! Perferendis, asperiores.</p>                   
                   </div>
                   <span className='clip-1'>
                       <p>Author : <strong>{articleData.author}</strong></p>
                       {/* <p>Published At : <strong>{TimeConverter(articleData.published)}</strong></p> */}
                       <p>{new Date(articleData.published).toLocaleDateString()}</p>
                   </span>
                   <div className="like-container">
                        <p className="publish">Published At : {TimeConverter(articleData.published)}</p>
                        <p className={likedArticles.some(item => item.id === articleData.id) ? "color-red" : ''} onClick={() => toggleLike(articleData)} style={{fontSize: "30px"}}>
                            <AiOutlineLike />
                        </p>
                    </div>
               </div>
           </div>
           </>
    );
};

export default ArticlePage;

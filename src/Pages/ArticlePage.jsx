import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { TimeConverter } from '../Functions/useTimeConverter';
import { CategoryContext } from '../Context/CategoryContext';
import { AiOutlineLike } from 'react-icons/ai';
import useCheckMobileScreen from "../Functions/useCheckMobileScreen"
import "./style.css";

const ArticlePage = () => {
    const { id } = useParams();
    const location = useLocation();
   const { article } = location.state || {};  // Destructure article from location.state
   const [articleData, setArticleData] = useState({});
   const isMobile = useCheckMobileScreen();

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
           { !isMobile ? (
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
           ): (
            <div className='article-Container'>
               <div className='article-details'>
                   <h1>{articleData.title}</h1>
                   <img src={articleData.image}/>
                   <div>
                    <div className="like-container">
                        <p className="publish">Published At : {TimeConverter(articleData.published)}</p>
                        <p className={likedArticles.some(item => item.id === articleData.id) ? "color-red" : ''} onClick={() => toggleLike(articleData)} style={{fontSize: "30px"}}>
                            <AiOutlineLike />
                        </p>
                    </div>
                    <span className='clip-1'>
                       <p>Author : <strong>{articleData.author}</strong></p>
                       {/* <p>Published At : <strong>{TimeConverter(articleData.published)}</strong></p> */}
                       <p>{new Date(articleData.published).toLocaleDateString()}</p>
                   </span>
                    <p>{articleData.description}</p>
                   <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, provident! Laborum debitis in, ullam eos asperiores repellendus, ratione expedita illum commodi aliquam porro! Voluptatum quam reprehenderit molestiae asperiores! Perferendis, asperiores.</p>                   
                   <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, provident! Laborum debitis in, ullam eos asperiores repellendus, ratione expedita illum commodi aliquam porro! Voluptatum quam reprehenderit molestiae asperiores! Perferendis, asperiores.</p>                   
                   </div>
               </div>
           </div>
           )}
           </>
    );
};

export default ArticlePage;

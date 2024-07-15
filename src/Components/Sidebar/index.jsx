import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import './style.css';
import { CategoryContext } from '../../Context/CategoryContext';
import { MdClose } from "react-icons/md";


const Sidebar = ({ isOpen, onClose, likedArticles }) => {
    const {toggleLike} = useContext(CategoryContext);
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}><IoIosArrowForward /></button>
            <h2>Liked Articles</h2>
            <ul>
                {likedArticles.length > 0 ? ( likedArticles.map((article, index) => (
                    <li key={index} style={{display : "flex", alignItems:"center", justifyContent : "space-between", gap:"1rem"}}>
                        {/* <Link to={article.url} target="_blank">{article.title}</Link> */}
                        <img src={article.image} style={{height : "50px", width:"50px"}}/>
                        <Link to={`/article/${article.id}`} state={{article : {article}}} style={{color : "black"}}>{article.title}</Link>
                        <p onClick={() => toggleLike(article)} style={{fontSize : "25px"}}><MdClose/></p>
                        {/* <Link to={`/article/${article.id}`} state={{article : {article}}}>{article.title}</Link> */}
                    </li>
                ))) : (
                    <>
                    <p>No Likes Till Now</p>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;

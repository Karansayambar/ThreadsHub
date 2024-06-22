import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import './style.css';

const Sidebar = ({ isOpen, onClose, likedArticles }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}><IoIosArrowForward /></button>
            <h2>Liked Articles</h2>
            <ul>
                {likedArticles.length > 0 ? ( likedArticles.map((article, index) => (
                    <li key={index}>
                        <Link to={article.url} target="_blank">{article.title}</Link>
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

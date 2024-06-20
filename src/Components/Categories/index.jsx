import { useContext, useState } from 'react';
import './style.css';
import { CategoryContext } from '../../Context/CategoryContext';

const Categories = () => {

    const {category, setCategory} = useContext(CategoryContext);
    console.log("dtata is ",category);
    const arr = ["Politics", "Business", "Technology", "Health", "Sports" ,"Entertainment"];


  return (
    <div>
        <div className="list">
            {
                arr.map((item, index) => (
                    <p 
                    key={index} 
                    onClick={() => setCategory(item)} 
                    className={item == category ? 'active' : ''}>{item}
                    </p>
                ))
            }
        </div>
    </div>
  )
}

export default Categories;